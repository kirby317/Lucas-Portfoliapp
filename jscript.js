  // JavaScript Document
options = {
    linkType: "preview",
// "preview" (default) is a preview link to the document for sharing,
// "direct" is an expiring link to download the contents of the file.
// For more information about link types, see <a href="#link-types">Link types</a>
multiselect: false,
            // false (default) limits selection to a single file,
            // true enables multiple file selection.
success: function(files) {
    // Required. Called when a user selects an item in the Chooser
    $("#thebackground").attr("background-image", files[0].link);

},
cancel:  function() {
    // Called when the user closes the dialog
    // without selecting a file and does not include any parameters.
}
};
function dbchoose() {
    alert("abouttochose");
    Dropbox.choose(options);

}