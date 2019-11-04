var notifications = [];

$(document).ready(function () {
    getNotifications();
});

function getNotifications() {
    $("#notifications").find("*").remove();
    showProgress("Memuat notifikasi");
    $.ajax({
        type: 'GET',
        url: PHP_PATH + 'get.php?name=notifications',
        dataType: 'text',
        cache: false,
        success: function (a) {
            notifications = JSON.parse(a);
            for (var i = 0; i < notifications.length; i++) {
                var notification = notifications[i];
                var trial = "Tidak";
                if (parseInt(notification["is_trial"]) == 1) {
                    trial = "Ya";
                }
                var date = Date(parseInt(notification["date"]));
                $("#notifications").append("" +
                    "<tr>" +
                    "<td><div style='background-color: #2f2e4d; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: white;'>" + i + "</div></td>" +
                    "<td>" + notification["title"] + "</td>" +
                    "<td>" + notification["content"] + "</td>" +
                    "<td>" + date.toLocaleDateString("id-ID", {
                        weekday: "long", day: "numeric", month: "numeric", year: "numeric"
                    }) + "</td>" +
                    "<td><a class='edit-notification link'>Ubah</a></td>" +
                    "<td><a class='delete-notification link'>Hapus</a></td>" +
                    "</tr>"
                );
            }
            hideProgress();
            setNotificationClickListener();
        }
    });
}

function setNotificationClickListener() {
}