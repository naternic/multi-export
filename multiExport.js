/* *********************** */
/* Projekt: Alle geöffneten InDesign-Dateien exportieren */
/* Datei: multiExport.js */
/* Entwickler: Nicolas Nater, Topix AG, topix.ch */
/* *********************** */

function main() {
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;

    if (app.documents.length == 0) {
        alert("Es ist kein Dokument geöffnet!");
        return;
    }

    //Durch Dokumente loopen und speichern
    for (var i = 0; i < app.documents.length; i++) {
        app.documents[i].save();
    }

    //Exportformate wählen
    var IstOkay = false;
    while (IstOkay == false) {
        var _window = new Window("dialog", "Alle offenen Files exportieren");
        var _exportGroup = _window.add("group");
        _exportGroup.add("statictext", undefined, "Ausgabe: ");
        var _PDF = _exportGroup.add("checkbox", undefined, "PDF");
        var _JPG = _exportGroup.add("checkbox", undefined, "JPG");
        var _PNG = _exportGroup.add("checkbox", undefined, "PNG");
        _PDF.value = true;
        //Buttons
        var _buttonGroup = _window.add("group");
        _buttonGroup.alignment = "center";
        _buttonGroup.add("button", undefined, "OK");
        _buttonGroup.add("button", undefined, "Cancel");

        var res = _window.show();

        if (res == 2) //Abbrechen
        {
            return;
        }

        if (_PDF.value === false && _PNG.value === false && _JPG.value === false) {
            alert("Bitte wähle mindestens ein Ausgabeformat aus.");
        } else {
            IstOkay = true;
        }
    }

    //Zielordner wählen
    var _savePath = Folder.selectDialog('Zielordner')
    if (_savePath === null) {
        return;
    }
    _savePath = _savePath + "/";
    var _docname = app.documents[0].name.replace(/\.indd$/, "");;
    var _targetFile;

    //Speicherort nach bestehenden Files durchsuchen
    for (var i = 0; i < app.documents.length; i++) {
        _docname = app.documents[i].name.replace(/\.indd$/, "");
        if (_PDF.value === true) {
            _targetFile = new File(_savePath + _docname + ".pdf")
        } else if (_JPG.value === true) {
            _targetFile = new File(_savePath + _docname + ".jpg")
        } else if (_PNG.value === true) {
            _targetFile = new File(_savePath + _docname + ".png")
        }
        if (_targetFile.exists === true) {
            var _targetFileWindow = Window.confirm("Sollen bestehende Dateien überschrieben werden?", true);
            break;
        }
    }
    if (_PDF.value === true) {
        _savePDF(_docname);
    }
    if (_PNG.value === true) {
        _savePNG(_docname);
    }
    if (_JPG.value === true) {
        _saveJPG(_docname);
    }

    function _savePDF(x) {
        var fileToExport = File(_savePath + x + ".pdf");
        if (fileToExport.exists) {
            var modDate = fileToExport.modified.toString();
        }
        app.documents[0].exportFile(ExportFormat.PDF_TYPE, File(_savePath + x + ".pdf"), true);
        if (!fileToExport.exists || fileToExport.modified.toString() == modDate) {
            exit();
        }
        for (var j = 0; j < app.documents.length; j++) {
            if (_targetFileWindow === false) {
                x = app.documents[j].name.replace(/\.indd$/, " 1");
            } else if (_targetFileWindow === true || _targetFileWindow === undefined) {
                x = app.documents[j].name.replace(/\.indd$/, "");
            }
            app.documents[j].exportFile(ExportFormat.PDF_TYPE, File(_savePath + x + ".pdf"), false);
        }
    }

    function _savePNG(x) {
        var fileToExport = File(_savePath + x + ".png");
        if (fileToExport.exists) {
            var modDate = fileToExport.modified.toString();
        }
        app.documents[0].exportFile(ExportFormat.PNG_FORMAT, File(_savePath + x + ".png"), true);
        if (!fileToExport.exists || fileToExport.modified.toString() == modDate) {
            exit();
        }
        for (var j = 0; j < app.documents.length; j++) {
            if (_targetFileWindow === false) {
                x = app.documents[j].name.replace(/\.indd$/, " 1");
            } else if (_targetFileWindow === true || _targetFileWindow === undefined) {
                x = app.documents[j].name.replace(/\.indd$/, "");
            }
            app.documents[j].exportFile(ExportFormat.PNG_FORMAT, File(_savePath + x + ".png"), false);
        }
    }

    function _saveJPG(x) {
        var fileToExport = File(_savePath + x + ".jpg");
        if (fileToExport.exists) {
            var modDate = fileToExport.modified.toString();
        }
        app.documents[0].exportFile(ExportFormat.JPG, File(_savePath + x + ".jpg"), true);
        if (!fileToExport.exists || fileToExport.modified.toString() == modDate) {
            exit();
        }
        for (var j = 0; j < app.documents.length; j++) {
            if (_targetFileWindow === false) {
                x = app.documents[j].name.replace(/\.indd$/, " 1");
            } else if (_targetFileWindow === true || _targetFileWindow === undefined) {
                x = app.documents[j].name.replace(/\.indd$/, "");
            }
            app.documents[j].exportFile(ExportFormat.JPG, File(_savePath + x + ".jpg"), false);
        }
    }

    var _toClose = new Window("dialog", "Schliessen");
    var _toCloseGroup = _toClose.add("group");
    _toCloseGroup.add("statictext", undefined, "Sollen alle offenen Files geschlossen werden?");
    var _toCloseButtons = _toClose.add("group");
    var _ja = _toCloseButtons.add("button", undefined, "Ja");
    var _nein = _toCloseButtons.add("button", undefined, "Nein");
    
    var _num = 0;
    
    _ja.onClick = function () {
        _num = 1;
        _toClose.close()
    }
    _nein.onClick = function () {
        _toClose.close()
    }
    
    _toClose.show();
    if (_num = 1) {
            for (var i = 0; app.documents.length > 0; i) {
                app.documents[i].close(SaveOptions.YES);
            }
    }

}

main();