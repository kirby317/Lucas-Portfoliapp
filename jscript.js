// JavaScript Document

options = {
    linkType: "direct",
// "preview" (default) is a preview link to the document for sharing,
// "direct" is an expiring link to download the contents of the file.
// For more information about link types, see <a href="#link-types">Link types</a>
multiselect: false,
            // false (default) limits selection to a single file,
            // true enables multiple file selection.
success: function(files) {
    // Required. Called when a user selects an item in the Chooser
    $("#pic").attr("src", files[0].link)
},
cancel:  function() {
    // Called when the user closes the dialog
    // without selecting a file and does not include any parameters.
}
};
    $(function () {

        var dbChooser = $("#db-chooser");

        dbChooser.on("DbxChooserSuccess", function (e) {

            // Here we will listen when a file is
            // chosen from dropbox, insert it into the page
            // and initialize the Jcrop plugin
            e = e.originalEvent;
            var name = e.files[0].name;
        });
    });
    function doit() {
        Dropbox.choose(options);
    }