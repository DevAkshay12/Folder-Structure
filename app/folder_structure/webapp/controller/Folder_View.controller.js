sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/VBox",
    "sap/m/Label",
    "sap/ui/webc/main/TreeItemCustom",
    "sap/m/HBox",
    "sap/ui/core/Icon",
    "sap/m/Text",
    "sap/m/MessageBox"
],
    function (Controller, MessageBox) {
        "use strict";
        var mode = false;
        var Fold_count;
        var token;
        var token_data = [];
        var token1;
        var token_data1 = [];

        return Controller.extend("folderstructure.controller.Folder_View", {
            onInit: function () {

            },

            edit: async function (oEvent) {
                debugger
                Fold_count = this.getView().mAggregations.content[0].mAggregations.content[1].mAggregations.items[0].mAggregations.items[0].mAggregations.items;
                for (let a = 0; a < Fold_count.length; a++) {
                    Fold_count[a].mAggregations.content[0].mAggregations.items[1].mAggregations.items[1].setEditable(true);
                }

            },

            button: async function (oEvent) {
                for (let a = 0; a < Fold_count.length; a++) {
                    Fold_count[a].mAggregations.content[0].mAggregations.items[1].mAggregations.items[1].setEditable(false);
                }
                debugger;
                var path = this.getView().byId("main").getItems()[0].mAggregations.items[0].mAggregations.items;
                for (let i = 0; i < path.length; i++) {
                    var fold_name = path[i].mAggregations.content[0].mAggregations.items[1].mAggregations.items[0].getText();
                    var combo_names = path[i].mAggregations.content[0].mAggregations.items[1].mAggregations.items[1].getSelectedKeys();
                    if (fold_name.length && combo_names.length != 0) {
                        let funcname = 'data';
                        let ofunc = oEvent.oSource.getModel().bindContext(`/${funcname}(...)`);
                        ofunc.setParameter('id', fold_name);
                        ofunc.setParameter('Data', combo_names);
                        await ofunc.execute();
                        const oContext = ofunc.getBoundContext();
                        var result = oContext.getValue();
                        console.log(result);
                    }
                }
                var sMsg = "Saved Successfully";
                new sap.m.MessageBox.success(sMsg);
            },

            onAfterRendering: async function (oEvent) {


                var head = this.getView().byId("page");

                var box = this.getView().byId("hbox");
                box.addItem(
                    new sap.m.Title({
                        text: "Folders"
                    }).addStyleClass("folder")
                )
                box.addItem(
                    new sap.m.Title({
                        text: "Assign"
                    }).addStyleClass("title")
                )
                debugger
                function generateUniqueId() {
                    // Generate a random number and convert it to base 36 (0-9a-z)
                    const randomPart = Math.random().toString(36).substr(2, 9);

                    // Get the current timestamp and convert it to base 36
                    const timestampPart = Date.now().toString(36);

                    // Concatenate the random part and timestamp part
                    const uniqueId = randomPart + timestampPart;

                    return uniqueId;
                }
                // Get the view
                debugger;



                let funcname = 'getdata';
                var getdata_val = "1"
                let ofunc = oEvent.oSource.getModel().bindContext(`/${funcname}(...)`);
                ofunc.setParameter('id', getdata_val);
                await ofunc.execute();
                const oContext = ofunc.getBoundContext();
                var result = oContext.getValue();
                result = JSON.parse(result.value);
                var vals = []

                // loop for Folder entity
                for (let i = 0; i < result.data1.length; i++) {
                    vals.push(result.data1[i].Folder_Name);
                }

                console.log(result);

                var main = this.getView().byId("main");
                var names = ["John", "Ajay", "Dhanush", "Ranjana", "Dhanush g"];
                var defaultValues = [];
                var defaultValues_demo = ["John", "Ajay"]; // Example default values

                // var vals = [1, 2, 3, 4, 56, 6];
                main.addItem(
                    new sap.ui.webc.main.Tree(`tree${generateUniqueId()}`, {
                        itemClick: async function (params) {

                        },
                        // headerText: "Folders",
                        items: [
                            new sap.ui.webc.main.TreeItemCustom(`fold1${generateUniqueId()}`, {
                                content: [
                                    new sap.m.HBox({
                                        items: [
                                            new sap.ui.core.Icon({
                                                src: "sap-icon://folder-full"
                                            }),
                                            new sap.m.HBox(`hbox_fold1_text`, {
                                                justifyContent: "SpaceBetween",
                                                items: [ // Customize child folder appearance as needed
                                                    new sap.m.Text({ text: "ROOT" }),
                                                ]
                                            }).addStyleClass("child"),
                                        ]
                                    })
                                ]
                            })]

                    }))
                let Mtree = main.getItems()[0];
                for (let i = 0; i < vals.length; i++) {
                    var check1 = vals[i];
                    defaultValues = []
                    for (let j = 0; j < result.data.length; j++) {
                        if (check1 == result.data[j].id) {
                            defaultValues.push(result.data[j].Data)
                        }
                    }
                    var tflag;
                    Mtree.getItems()[0].addItem(new sap.ui.webc.main.TreeItemCustom(`fold1.1${generateUniqueId()}`, {
                        content: [
                            new sap.m.HBox({
                                items: [
                                    new sap.ui.core.Icon(`hbox_fold1.1_icon${generateUniqueId()}`, {
                                        src: "sap-icon://folder-full"
                                    }).addStyleClass("ven1"),

                                    new sap.m.HBox(`hbox_fold1.1_text${generateUniqueId()}`, {
                                        width: "700px",
                                        justifyContent: "SpaceBetween",
                                        items: [ // Customize child folder appearance as needed
                                            new sap.m.Text({ text: vals[i] }).addStyleClass("ven1"),
                                            new sap.m.MultiComboBox({
                                                width: "400px",
                                                editable: mode,
                                                items: names.map(function (name) {
                                                    return new sap.ui.core.Item({
                                                        key: name,
                                                        text: name,
                                                    });
                                                }),
                                                selectedKeys: defaultValues,
                                                showSelectAll:true,
                                                selectionFinish:async function (params) {
                                                    debugger
                                                    let data_array = []
                                                    let data = params.mParameters.selectedItems
                                                    let folder_name = params.mParameters.selectedItems[0].oParent.oParent.mAggregations.items[0].getText();
                                                    for(var a=0;a<data.length;a++)
                                                    {
                                                        console.log();
                                                        data_array.push(data[a].getText());
                                                    }
                                                    console.log()
                                                    let funcname = 'check';
                                                    var getdata_val = "1"
                                                    let ofunc = oEvent.oSource.getModel().bindContext(`/${funcname}(...)`);
                                                    ofunc.setParameter('id', data_array);
                                                    ofunc.setParameter('fold', folder_name);
                                                    await ofunc.execute();
                                                    const oContext = ofunc.getBoundContext();
                                                    var result = oContext.getValue();
                                                    console.log("unselected value has been removed");
                                                },
                                                change: async function (oEvent) {
                                                // if(oEvent.mParameters.value.length > 0)
                                                // {
                                                    // debugger;
                                                //     let unselected_data = oEvent.mParameters.value
                                                //     let unselected_fold = oEvent.oSource.oParent.mAggregations.items[0].getText();
                                                //     let funcname = 'remove';
                                                //     let ofunc = oEvent.oSource.getModel().bindContext(`/${funcname}(...)`);
                                                //     ofunc.setParameter('id', unselected_data);
                                                //     ofunc.setParameter('fold', unselected_fold);
                                                //     await ofunc.execute();
                                                //     const oContext = ofunc.getBoundContext();
                                                //     var result = oContext.getValue();
                                                //     console.log("unselected");
                                                // }
                                                    debugger  
                                                    if (tflag) {
                                                       
                                                        token1 = oEvent.oSource.mAggregations.tokenizer.mAggregations.tokens;
                                                        for(let i=0;i<token1.length;i++)
                                                        {
                                                            token_data1.push(token1[i].getText());
                                                        }
                                                      
                                                        var removedData = token_data.filter(item => !token_data1.includes(item));
                                                        var removedid = oEvent.oSource.getParent().mAggregations.items[0].getText();
                                                        // function import to remove/delete
                                                        if(removedData.length && removedid.length > 0)
                                                        {
                                                        let funcname = 'remove';
                                                        let ofunc = oEvent.oSource.getModel().bindContext(`/${funcname}(...)`);
                                                        ofunc.setParameter('id', removedid);
                                                        ofunc.setParameter('fold', removedData);
                                                        await ofunc.execute();
                                                        const oContext = ofunc.getBoundContext();
                                                        var result = oContext.getValue();
                                                        // result = JSON.parse(result.value);
                                                        console.log("executed delete");
                                                        token_data = [];
                                                        token_data1 = [];
                                                        }
                                                    }
                                                    tflag = false;
                                                },
                                                selectionChange: async function (oEvent) {
                                                    debugger
                                                    tflag = true;
                                                    token = oEvent.oSource.mAggregations.tokenizer.mAggregations.tokens;
                                                    for(let i=0;i<token.length;i++)
                                                    {
                                                        token_data.push(token[i].getText());
                                                    }
                                                    token = Array.from(new Set(token_data));
                                                    if(token == "Select All")
                                                    {

                                                    }
                                                    console.log();
                                                }
                                            }).addStyleClass("box")
                                        ]
                                    }).addStyleClass("child")
                                ]
                            })
                        ],

                    }),)
                    debugger
                  var child = Mtree.mAggregations.items[0].mAggregations.items[6];
                  var sbu_child = ["PPT","Backup Data","Approval"]
                  if (check1 == "SBU VOB FORUM")
                  {
                    for(let c = 0;c<sbu_child.length;c++)
                    {
                       child.addItem(new sap.ui.webc.main.TreeItemCustom(`fold1.1${generateUniqueId()}`, {
                        content: [
                            new sap.m.HBox({
                                items: [
                                    new sap.ui.core.Icon(`hbox_fold1.1_icon${generateUniqueId()}`, {
                                        src: "sap-icon://folder-full"
                                    }).addStyleClass("ven1"),

                                    new sap.m.HBox(`hbox_fold1.1_text${generateUniqueId()}`, {
                                        width: "700px",
                                        justifyContent: "SpaceBetween",
                                        items: [ // Customize child folder appearance as needed
                                            new sap.m.Text({ text: sbu_child[c] }).addStyleClass("ven1"),
                                            new sap.m.MultiComboBox({
                                                width: "400px",
                                                editable: mode,
                                                items: names.map(function (name) {
                                                    return new sap.ui.core.Item({
                                                        key: name,
                                                        text: name,
                                                    });
                                                }),
                                                selectedKeys: defaultValues,
                                            }).addStyleClass("box1")
                                        ]
                                    }).addStyleClass("child1")
                                ]
                            })
                        ],

                    }),)
                    }
                  }            
                    
                }
                
            }
        })
    });
