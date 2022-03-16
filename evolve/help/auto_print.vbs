PrintFolder = "Z:\input\" 
Dim objFSO
Set objFSO = CreateObject("Scripting.FileSystemObject")
Dim wshell
Set wshell = WScript.CreateObject("WScript.Shell")
Set objShell = CreateObject("Shell.Application")

Do

Set objFolder = objShell.Namespace(PrintFolder) 
Set colItems = objFolder.Items()
If colItems.Count > 0 Then
 For Each colItems in colItems
     colItems.InvokeVerbEx ("Print")
 Next
 WScript.Sleep 1000
 objFSO.DeleteFile("Z:\input\*")
End If 

WScript.Sleep 1000

Loop