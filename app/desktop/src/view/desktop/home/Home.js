Ext.define('Bidmo.view.desktop.home.Home', {
    extend: 'Ext.Panel',
    layout: 'fit',
    padding: '0px 20px',
    tbar: {
        xtype: 'header',
        shadow: true,
        defaults: {
            margin: '0px 12px 0px 0px'
        },
        items: [{
            xtype: 'profile',
            bind: {
                hidden: '{authenticated}'
            }
        },{
            xtype: 'profile',
            arrow: false,
            menu: {
                anchor: true,
                width: 120,
                ui: 'scpf-menu',
                items: [{
                    text: 'My Profile'
                }, {
                    text: 'Add Account'
                }]
            },
            bind: {
                hidden: '{!authenticated}'
            }
        }, {
            xtype: 'logo'
        }, {
            xtype: 'deposit-button',
            width: 120,
            bind: {
                hidden: '{!authenticated}'
            }
        }, '->', {
            xtype: 'image-button',
            width: 130,
            data: {
                Text: '678190',
                Image: undefined,
                Name: 'Transaction'
            },
            bind: {
                hidden: '{!authenticated}'
            }
        },{
            xtype: 'image-button',
            width: 130,
            data: {
                Text: 'T330001',
                Image: 'bob.jpg',
                Name: 'Transaction'
            },
            bind: {
                hidden: '{!authenticated}'
            }
        }, {
            xtype: 'logout',
            arrow: false,
            menu: {
                anchor: true,
                width: 120,
                ui: 'scpf-menu',
                items: [{
                    text: 'Logout',
                    iconCls: 'icofont-logout'
                }, {
                    text: 'History',
                    iconCls: 'icofont-history'
                }]
            },
            bind: {
                hidden: '{!authenticated}'
            }
        }, {
            xtype: 'register',
            width: 120,
            bind: {
                hidden: '{authenticated}'
            }
        }, {
            xtype: 'login-button',
            width: 120,
            bind: {
                hidden: '{authenticated}'
            }
        }]
    },
    items: [{
        xtype: 'content',
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        margin: 10,
        flex: 1,
        items: [{
            xtype: 'chartsection',
            flex: 1,
            tbar: {
                shadow: false,
                cls: Ext.baseCSSPrefix + 'trans',
                xtype: 'chartaction',
                defaults: {
                    margin: '0px 6px'
                },
                items: [{
                    xtype: 'coinpair'
                }, {
                    xtype: 'chart-type',
                    width: 60,
                    height: 32
                }, {
                    xtype: 'chart-time',
                    width: 60,
                    height: 32
                }, {
                    xtype: 'chart-indicator',
                    width: 60,
                    height: 32
                },'->', {
                    xtype: 'statisticbuy',
                    data: {
                        Percentage: '12%'
                    }
                }, {
                    xtype: 'statisticsell',
                    data: {
                        Percentage: '12%'
                    }
                }, {
                    xtype: 'trade',
                    text: 'Trade',
                    handler: function(button) {
                        button.runTimer(70);
                    }
                }]
            }
        }],
        /* lbar: {
            xtype: 'leftmenu',
            height: '100%',
            width: 65,
            bodyPadding: 10,
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'bsblock',
                flex: 1,
                data: {
                    BuyBlocks: 32,
                    SellBlocks: 12
                }
            },{
                xtype: 'chart-type',
                margin: '4px 0px',
                width: 45,
                height: 36
            }, {
                xtype: 'chart-time',
                margin: '4px 0px',
                width: 45,
                height: 36
            }, {
                xtype: 'chart-indicator',
                margin: '4px 0px',
                width: 45,
                height: 36
            }]
        }, */
        rbar: {
            xtype: 'detail',
            height: '100%',
            width: 300,
            bodyPadding: 10,
            flex: 1,
            defaults: {
                margin: '8px 0px'
            },
            items: [{
                xtype: 'tradehistory',
                data: {
                    TradeHistory: [
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'buy', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'buy', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'buy', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'},
                        {Type: 'sell', Column1: '0.085901', Column2: '0.078', Column3: '15:00:51'}
                    ]
                },
                bind: {
                    hidden: '{!authenticated}'
                }
            },{
                xtype: 'idea',
                flex: 1,
                data: {
                    PercentBuy: '35%',
                    PercentSell: '65%',
                    PriceBuy: 9.2345,
                    PriceSell: 9.2345,
                    PriceUnit: '$'
                }
            }, {
                xtype: 'money-button',
                defaults: {
                    flex: 0
                },
                items: [{
                    iconCls: 'icofont-thin-left'
                }, {
                    text: "50",
                    flex: 1
                }, {
                    iconCls: 'icofont-thin-right'
                }]
            }, {
                xtype: 'buynow',
                bind: {
                    iconAlign: '{iconAlignBigButton}'
                }
            }, {
                xtype: 'sellnow',
                bind: {
                    iconAlign: '{iconAlignBigButton}'
                }
            }]
        }
    }],
    getChartSection: function() {
        return this.down('chartsection');
    },
    listeners: {
        show: function(view) {
            TenchanChart.createChart('#chart-section')
        },
        resize: function (view) {
            var dataPath = Ext.getResourcePath('data-simple.csv', null, 'data');
            var feed;
            var chart = TenchanChart.chart;
            if(Ext.Object.isEmpty(chart)) return false;
            d3.csv(dataPath, function (error, data) {
                var accessor = chart.candlestick.accessor();
                var parseDate = d3.timeParse("%d-%b-%y");
                feed = data.slice(0, 200).map(function (d) {
                    return {
                            date: parseDate(d.Date),
                            open: +d.Open,
                            high: +d.High,
                            low: +d.Low,
                            close: +d.Close,
                            volume: +d.Volume
                    };
                }).sort(function (a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

                TenchanChart.redraw(feed.slice(0, 163));
            });
        }
    }
});