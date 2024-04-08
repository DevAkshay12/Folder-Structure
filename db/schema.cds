namespace db;

entity Folder {
    key id : String;
    Folder_Name : String;
    P_TO_C : Composition of many Data on P_TO_C.id = Folder_Name;
}

entity Data {
    id : String;
    Data : String;
    C_TO_P : Association to one Folder on C_TO_P.Folder_Name = id;
}







