var settings;
var banks;

$(document).ready(function() {
    if (location.protocol !== 'https:') {
        location.protocol = 'https';
        return;
    }
    getSettings();
});

function getSettings() {
    $("#banks").find("*").remove();
    showProgress("Memuat pengaturan");
    $.ajax({
        type: 'GET',
        url: PHP_PATH+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            settings = JSON.parse(a);
            var purchasing = settings["settings"]["purchasing"];
            banks = settings["settings"]["banks"];
            $("#month-1").val(purchasing[0]["price"]);
            $("#month-1-feature-1").val(purchasing[0]["features"][0]["msg"]);
            $("#month-1-feature-2").val(purchasing[0]["features"][1]["msg"]);
            $("#month-1-feature-3").val(purchasing[0]["features"][2]["msg"]);
            $("#month-1-feature-4").val(purchasing[0]["features"][3]["msg"]);
            $("#month-3").val(purchasing[1]["price"]);
            $("#month-3-feature-1").val(purchasing[1]["features"][0]["msg"]);
            $("#month-3-feature-2").val(purchasing[1]["features"][1]["msg"]);
            $("#month-3-feature-3").val(purchasing[1]["features"][2]["msg"]);
            $("#month-3-feature-4").val(purchasing[1]["features"][3]["msg"]);
            $("#month-6").val(purchasing[2]["price"]);
            $("#month-6-feature-1").val(purchasing[2]["features"][0]["msg"]);
            $("#month-6-feature-2").val(purchasing[2]["features"][1]["msg"]);
            $("#month-6-feature-3").val(purchasing[2]["features"][2]["msg"]);
            $("#month-6-feature-4").val(purchasing[2]["features"][3]["msg"]);
            $("#month-12").val(purchasing[3]["price"]);
            $("#month-12-feature-1").val(purchasing[3]["features"][0]["msg"]);
            $("#month-12-feature-2").val(purchasing[3]["features"][1]["msg"]);
            $("#month-12-feature-3").val(purchasing[3]["features"][2]["msg"]);
            $("#month-12-feature-4").val(purchasing[3]["features"][3]["msg"]);
            for (var i=0; i<banks.length; i++) {
                var bank = banks[i];
                var bankName = getBankByType(parseInt(bank["type"])-1);
                $("#banks").append(""+
                    "<tr>" +
                        "<td>"+bank["number"]+"</td>"+
                        "<td>"+bankName+"</td>"+
                        "<td>"+bank["holder"]+"</td>"+
                        "<td><a class='delete-bank link'>Hapus</a></td>"+
                    "</tr>"
                );
            }
            setDeleteBankClickListener();
            hideProgress();
        }
    });
}

function getBankByType(index) {
    var bankNames = [
        "BNI", "BCA", "BRI", "BTN", "Mandiri", "CIMB Niaga", "Permata", "Danamon"
    ];
    return bankNames[index];
}

function setDeleteBankClickListener() {
    $(".delete-bank").on("click", function() {
        var tr = $(this).parent().parent();
        var index = tr.parent().children().index(tr);
        $("#confirm-title").html("Hapus Bank");
        $("#confirm-msg").html("Apakah Anda yakin ingin menghapus bank ini?");
        $("#confirm-container").css("display", "flex").hide().fadeIn(300);
        $("#confirm-ok").on("click", function() {
            $("#confirm-container").fadeOut(300);
            showProgress("Menghapus bank");
            banks.splice(index, 1);
            updateSettings();
        });
        $("#confirm-cancel").on("click", function() {
            $("#confirm-container").fadeOut(300);
        });
    });
}

function addBank() {
    $("#add-bank-name option")[0].selected = true;
    $("#add-bank-holder").val("");
    $("#add-bank-number").val("");
    $("#add-bank-container").css("display", "flex").hide().fadeIn(300);
}

function closeAddBankDialog() {
    $("#add-bank-container").fadeOut(300);
}

function addNewBank() {
    var bankIndex = $("#add-bank-name").prop("selectedIndex");
    var bankHolder = $("#add-bank-holder").val().trim();
    var bankNumber = $("#add-bank-number").val().trim();
    if (bankIndex == 0) {
        show("Mohon pilih jenis bank");
        return;
    }
    if (bankHolder == "") {
        show("Mohon masukkan nama pemilik rekening");
        return;
    }
    if (bankNumber == "") {
        show("Mohon masukkan nomor rekening");
        return;
    }
    var bankName = $("#select1").find(":selected").text();
    $("#add-bank-container").fadeOut(300);
    showProgress("Menambah bank");
    banks.push({'holder': bankHolder, 'number': bankNumber, 'type': bankIndex});
    updateSettings();
}

function saveSettings() {

}

function updateSettings() {
    var settingsJSON = JSON.stringify(settings);
    var fd = new FormData();
    fd.append("content", settingsJSON);
    $.ajax({
        type: 'POST',
        url: PHP_PATH+'update-settings.php',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            hideProgress();
            show("Pengaturan disimpan");
            getSettings();
        }
    });
}