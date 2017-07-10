//// In Makefile I've add the line : 
//
// sgvizler.pack.js: \
//         bordercloud/Table_mult.js \  
//
// There I'm adding my library Bordercloud to Sgvizler
// This will let me call any function in Bordercloud by typing :
// sgvizler.bordercloud.function_needed
    BorderCloud.visualization = ( function () {

            // Module dependencies:
            var util = S.util,
                namespace = S.namespace,
                charts = S.charts,
                // My library rely on sgvizler.visualization.util
                Cutil = S.visualization.util,

                B = {}, // sgvizler.bordercloud

                modSC = "bordercloud.visualization";
                console.log(util);

            /** 
             * Make an html table with links and images.
             * 
             * @class sgvizler.bordercloud.Table_mult
             * @extends sgvizler.charts.Chart
!!!!!!!! * @constructor  !!!!!!!!!!!!   jquery says that Table_mult is not a constructor
             * @param {Object} container The container element where the
             * chart will be drawn.
             * @since 0.5.1
             **/

            /** 
             * Available options:
             *  - 'headings'   :  "true" / "false"  (default: "true")
             *  - 'borders'    : any type of table from Bootstrap
             *  - 'im_width'   : width of images in the table
             *  - 'im_height'  : height of images in the table
             *
             * @method draw
             * @public
             * @param {google.visualization.DataTable} data
             * @param {Object} [chartOptions]
             * @since 0.5.1
             **/


// Just like you did with S.visualization.Table im adding this
// new chart with charts.add
// !!!!!!! I have an error : 2.077s: sgvizler.bordercloud.Table_mult -- TypeError: Func is not a constructor  !!!!!!
// when Im trying to call it in an HTML
            BC.Table_mult = charts.add(modSC, "Table_mult",
                function (data, chartOpt) {
                    var c, noColumns = data.getNumberOfColumns(),
                        r, noRows = data.getNumberOfRows(),
                        opt = $.extend({ headings: true, 
                                         borders: 'table table-bordered', 
                                         col : 'border:solid 5px black;max-width:150px;height:auto;',
                                         test : 'col2_img_max-width:250px;col3_img_max-width:300px;col3_img_max-height:300px'},
                                       chartOpt),
                        table,
                        rows = [],
                        cells = [],
                        i = 0,
                        opti = [];
console.log("inside");
                    Cutil.loadBOOTSTRAP();

                        for (i=0; i < noColumns ; i+=1) {
                            opti.push([]);
                        }

                        if (opt.test != undefined ) {
                            var options = opt.test.split(";");
                            var ilen = options.length;

                            for (i = 0; i < ilen; i += 1) {
                                var donnees = options[i].match(/^col([1-9]+)\_/);
                                var assignement = options[i].split("_");
                                opti[parseInt(donnees[1]-1)].push(assignement);                            
                            }
                        } 


                    if (opt.headings) {
                        for (c = 0; c < noColumns; c += 1) {
                            cells.push(['th', null, data.getColumnLabel(c)]);
                        }
                        rows.push(['tr', null, cells]);
                    }
                    // The false value returned by linkify2String in linkify allow
                    // to check if the data (row r, col c) is an image
                    for (r = 0; r < noRows; r += 1) {
                        cells = [];
                        for (c = 0; c < noColumns; c += 1) {
                            if ((opti[c].length>0) && (opti[c][0][1])) {
                                var optcol = '';
                                for (i=0; i<opti[c].length; i +=1) {
                                    optcol = optcol + opti[c][i][2] + ';';
                                }
                                cells.push(['td', null, [Cutil.linkify2String(data.getValue(r, c), optcol, opti[c][0][1])]]);
                            }
                            else{ 
                            cells.push(['td', null, [Cutil.linkify2String(data.getValue(r, c), opt.col, null )]]);
                            }
                        }
                        rows.push(['tr', null, cells]);
                    }

                    table = util.createHTMLElement('table', {'class': opt.borders}, rows);
                    $(this.container).empty().html(table);

                    this.fireListener('ready');
                }
                );

    return B;
    //there im closing the S.bordercloud class
        }()) ;
//