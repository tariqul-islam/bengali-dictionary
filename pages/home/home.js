(function () {
    "use strict";

    //Load Navigation
    var nav = WinJS.Navigation;

    //load roamingSettings
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    var homePage = WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            document.getElementById("Bengali").addEventListener("click", this.bengaliSelect, false);
            document.getElementById("English").addEventListener("click", this.englishSelect, false);

            ///Display the App-Bar but hide the Switch button
            document.getElementById('appbar').winControl.hideCommands(["switch"], false);
            document.getElementById('appbar').winControl.hideCommands(["hrapp1"], false);
            document.getElementById('appbar').winControl.hideCommands(["hrapp2"], false);


        },

        bengaliSelect: function () {
            roamingSettings.values["langChoice"] = "Bengali";
            nav.navigate("/pages/UIBengali/UIBengali.html");
        },

        englishSelect: function () {
            roamingSettings.values["langChoice"] = "English";
            nav.navigate("/pages/UIEnglish/UIEnglish.html");
        }
    });
})();
