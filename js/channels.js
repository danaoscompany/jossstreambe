var m3uData;
var channels = [];

$(document).ready(function() {
    getChannels();
});

function getChannels() {
    showProgress("Memuat channel");
    channels = [];
    $("#channels").find("*").remove();
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/channels.m3u',
        dataType: 'text',
        cache: false,
        success: function(a) {
            try {
                m3uData = a;
                var length = occurrences(m3uData, "#EXTINF");
                var a = 0;
                for (var i = 0; i < length; i++) {
                    a = m3uData.indexOf("#EXTINF", a) + 7;
                    var b = m3uData.indexOf("tvg-id", a) + 8;
                    var c = m3uData.indexOf("\"", b);
                    var id = m3uData.substr(b, c-b);
                    b = m3uData.indexOf("tvg-name", a) + 10;
                    c = m3uData.indexOf("\"", b);
                    var name = m3uData.substr(b, c-b);
                    b = m3uData.indexOf("tvg-logo", a) + 10;
                    c = m3uData.indexOf("\"", b);
                    var logo = m3uData.substr(b, c-b);
                    b = m3uData.indexOf("group-title", a) + 13;
                    c = m3uData.indexOf("\"", b);
                    var category = m3uData.substr(b, c-b);
                    a = m3uData.indexOf("group-title", a);
                    b = m3uData.indexOf("http", a);
                    c = m3uData.indexOf("\n", b);
                    var channelURL = m3uData.substr(b, c - b);
                    $("#channels").append(""+
                        "<tr>"+
                        "<td><div style='background-color: #2f2e4d; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: white;'>"+i+"</div></td>"+
                        "<td>"+id+"</td>"+
                        "<td>"+name+"</td>"+
                        "<td><img src='"+logo+"' width='40px' height='40px'></td>"+
                        "<td>"+category+"</td>"+
                        "<td>"+channelURL+"</td>"+
                        "<td><a class='edit-channel link'>Ubah</a></td>"+
                        "<td><a class='delete-channel link'>Hapus</a></td>"+
                        "</tr>"
                    );
                    channels.push({'id': id, 'name': name, 'logo': logo, 'category': category, 'url': channelURL});
                }
                setChannelClickListener();
                hideProgress();
            } catch (e) {
                console.log(e.toString());
            }
        }
    });
}

function setChannelClickListener() {
    $(".edit-channel").on("click", function() {
        var tr = $(this).parent().parent();
        var index = tr.parent().children().index(tr);
        var channel = channels[index];
        $("#edit-channel-name").val(channel["name"]);
        $("#edit-channel-category").val(channel["category"]);
        $("#edit-channel-url").val(channel["url"]);
        $("#edit-channel-logo").attr("src", channel["logo"]);
        $("#change-logo").unbind().on("click", function() {
            $("#select-logo").on("change", function() {
                var fr = new FileReader();
                fr.onload = function() {
                    $("#edit-channel-logo").attr("src", fr.result);
                    showProgress("Mengunggah logo");
                    var fd = new FormData();
                    fd.append("logo_data", fr.result);
                    $.ajax({
                        type: 'POST',
                        url: PHP_PATH+'upload-image.php',
                        data: fd,
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: function(a) {
                            var fileName = a;
                            var fileURL = "http://iptvjoss.com/jossstreambe/userdata/imgs/"+fileName;
                            hideProgress();
                            show("Logo channel berhasil dirubah");
                            channels[index]["logo"] = fileURL;
                        }
                    });
                };
                fr.readAsDataURL($("#select-logo").prop("files")[0]);
            }).click();
        });
        $("#edit-channel-ok").unbind().on("click", function() {
            var name = $("#edit-channel-name").val();
            var category = $("#edit-channel-category").val();
            var url = $("#edit-channel-url").val();
            if (name == "") {
                show("Mohon masukkan nama channel");
                return;
            }
            if (category == "") {
                show("Mohon masukkan kategori channel");
                return;
            }
            if (url == "") {
                show("Mohon masukkan URL channel");
                return;
            }
            channels[index]["name"] = name;
            channels[index]["category"] = category;
            channels[index]["url"] = url;
            $("#edit-channel-container").fadeOut(300);
            show("Channel disimpan");
        });
        $("#edit-channel-cancel").unbind().on("click", function() {
            $("#edit-channel-container").fadeOut(300);
        });
        $("#edit-channel-container").css("display", "flex").hide().fadeIn(300);
    });
    $(".delete-channel").on("click", function() {
        var tr = $(this).parent().parent();
        var index = tr.parent().children().index(tr);
        var channel = channels[index];
        $("#confirm-title").html("Hapus Channel");
        $("#confirm-msg").html("Apakah Anda yakin ingin menghapus channel ini?");
        $("#confirm-ok").unbind().on("click", function() {
            $("#confirm-container").hide();
            channels.splice(index, 1);
        });
        $("#confirm-cancel").unbind().on("click", function() {
            $("#confirm-container").fadeOut(300);
        });
        $("#confirm-container").css("display", "flex").hide().fadeIn(300);
    });
}

function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);
    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function isCategoryAlreadyAdded(name) {
    // Check if categori exists
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        if (category == name) {
            return true;
        }
    }
    return false;
}

function addChannel() {
    $("#edit-channel-name").val("");
    $("#edit-channel-category").val("");
    $("#edit-channel-url").val("");
}