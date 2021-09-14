# multi-export
InDesign script to export an InDesign file to PNG, JPG and/or PDF simultaneously based on user-defined settings. 

***
Was macht das Skript?
***

Das Skript checkt zuerst, ob alle Files gespeichert sind. Wenn nicht, wird der:die Anwender:in aufgefordert, die Files zu speichern. Der Speicherdialog wird durch das Skript direkt ausgelöst. Danach wird erfragt, in welches Format bzw. in welche Formate (JPG, PNG und/oder PDF) das InDesign-File exportiert werden soll. Es wird ein regulärer Export des ersten Files im jeweiligen Format ausgelöst und für die restlichen geloopt. Am Ende wird gefragt, ob die offenen Files geschlossen werden sollen.


***
What does the script do?
***

First of all, the script checks if all files have been saved. If not, the user will be asked to save them. The save dialog will be prompted by the script directly. Afterwards the user must define, which output formats (JPG, PNG and PDF are supported) they wish to export. The script will trigger a regular export of the first file for every desired format and then loops through the rest with the same settings. At the end, the user will be asked if they want the opened files to closed or not.
