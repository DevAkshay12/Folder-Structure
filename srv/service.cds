using db from '../db/schema';

service MyService {
    entity Folder as projection on db.Folder;
    entity Data as projection on db.Data;
    function data(id:String,Data:String) returns String;
    function getdata(id:String) returns String;
    function remove(id:String,fold:String) returns String;
    function check(id: String, fold: String) returns String;
    function delete1(id: String) returns String;
}