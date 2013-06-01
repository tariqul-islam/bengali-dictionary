// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    //load roamingSettings
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var lang = roamingSettings.values["langChoice"];

    //sessionState
    var sessionState = WinJS.Application.sessionState;

    //Powered By
    var power = '<br/><div id="power">Dictionary: © Ankur 2006-2009</div>';

    var UIPageEng = WinJS.UI.Pages.define("/pages/UIEnglish/UIEnglish.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            document.getElementById("search").addEventListener("click", changeInput, false);
            //document.getElementById("inputText").addEventListener("change", this.changeInput, false);

            document.getElementById("appbar").winControl.showCommands(["switch"], false);
            document.getElementById("appbar").winControl.showCommands(["hrapp1"], false);
            document.getElementById("appbar").winControl.showCommands(["hrapp2"], false);

            //Retrieve the appbar
            var appbar = document.getElementById("appbar").winControl;

            appbar.getCommandById("switch").addEventListener("click", changeLang, false);
            appbar.getCommandById("about").addEventListener("click", aboutclick, false);

            if (WinJS.Application.sessionState.previousExecutationState ===
            Windows.ApplicationModel.Activation.ApplicationExecutionState.terminated) {
                sessionRestore();
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });

    var UIPageBen = WinJS.UI.Pages.define("/pages/UIBengali/UIBengali.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            document.getElementById("search").addEventListener("click", changeInput, false);
            //document.getElementById("inputText").addEventListener("change", this.changeInput, false);


            document.getElementById("appbar").winControl.showCommands(["switch"], false);
            document.getElementById("appbar").winControl.showCommands(["hrapp1"], false);
            document.getElementById("appbar").winControl.showCommands(["hrapp2"], false);

            //Retrieve the appbar
            var appbar = document.getElementById("appbar").winControl;

            appbar.getCommandById("switch").addEventListener("click", changeLang, false);
            appbar.getCommandById("about").addEventListener("click", aboutclick, false);

            if (WinJS.Application.sessionState.previousExecutationState ===
            Windows.ApplicationModel.Activation.ApplicationExecutionState.terminated) {
                sessionRestore();
            }

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });

    function changeInput() {
        var input = document.getElementById("inputText").value;



        if (input != "") {
            var url = "http://www.bengalinux.org/cgi-bin/abhidhan/index.pl?en_word=" + input;
            WinJS.xhr({ url: url, responseType: "text" })
                .done(function completed(result) {


                    var staticHTML = toStaticHTML(result.responseText);

                    var result = staticHTML.substring(staticHTML.indexOf("<div id=search_results>"), staticHTML.indexOf("<div class=insert_outerbox>"));
                    var splitted = result.split("<a");
                    splitted.pop();

                    var toHTML = "";
                    splitted.forEach(function (split) {
                        var str = '<div class="dict_entry">' + split.substring(split.indexOf("dict_entry>") + 11, split.indexOf("&#160")) + '</div><br/>';
                        toHTML = toHTML + str;
                    });

                    var check = toHTML.substring(toHTML.indexOf('try">') + 5, toHTML.indexOf('</d'));

                    var resultGrid = document.getElementById("resultGrid");

                    if (check != "<div id=se") {
                        resultGrid.innerHTML = toHTML + power;

                    }
                    else {
                        var lang = roamingSettings.values["langChoice"];
                        if (lang == "English") {
                            toHTML = '<div class="notFound">Sorry! The Word <div class="strongWord">' + input + '</div> is not found in the Database.</div>' + power;
                            resultGrid.innerHTML = toHTML;
                        }
                        else {
                            toHTML = '<div id="notFound">দুঃখিত! ডাটাবেজে <div class="strongWord">' + input + '</div> শব্দটি খুজে পাওয়া যায় নি।</div>' + power;
                            resultGrid.innerHTML = toHTML;
                        }
                    }
                    sessionState.input = input;
                    sessionState.toHTML = toHTML;


                },

                function error(result) {
                    document.getElementById("resultGrid").innerHTML = '<div class="strongWord">Not found: Connection Error</div>';
                });
        }
    };

    function sessionRestore() {
        //If the app was terminated last time it ran, restore the personalized greeting

        var outputValue = sessionState.input;

        if (outputValue) {
            document.getElementById("inputText").value = outputValue;
        }

        outputValue = sessionState.toHTML;

        if (outputValue) {
            document.getElementById("resultGrid").innerHTML = outputValue;
        }
    };

    function changeLang() {
        if (lang) {
            if (lang == "English") {
                roamingSettings.values["langChoice"] = "Bengali";
                nav.navigate("/pages/UIBengali/UIBengali.html");
            }
            else {
                roamingSettings.values["langChoice"] = "English";
                nav.navigate("/pages/UIEnglish/UIEnglish.html");
            }
            lang = roamingSettings.values["langChoice"];
        }
    };

    function aboutclick() {
        nav.navigate("/pages/about/about.html");
    };
})();
