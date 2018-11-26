Ext.define('Bidmo.view.phone.home.Home', {
    extend: 'Ext.Panel',
    layout: 'fit',
    tbar: {
        xtype: 'header',
        defaults: {
            margin: '0px 8px'
        },
        items: [{
            xtype: 'profile',
            bind: {
                hidden: '{authenticated}'
            }
        }, {
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
                }, {
                    text: 'Deposite'
                }]
            },
            bind: {
                hidden: '{!authenticated}'
            }
        }, {
            xtype: 'logo',
            width: 40,
            height: 40
        }, '->', {
            xtype: 'image-button',
            width: 110,
            data: {
                Text: '678190',
                Image: undefined,
                Name: 'Transaction'
            },
            bind: {
                hidden: '{!authenticated}'
            }
        }, {
            xtype: 'image-button',
            width: 100,
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
                width: 140,
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
            width: 100,
            bind: {
                hidden: '{authenticated}'
            }
        }, {
            xtype: 'login-button',
            width: 100,
            bind: {
                hidden: '{authenticated}'
            }
        }]
    },
    items: [{
        xtype: 'content',
        plugins: {
            responsive: true
        },
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        flex: 1,
        items: [{
            xtype: 'chartsection',
            flex: 1,
            tbar: {
                shadow: false,
                cls: Ext.baseCSSPrefix + 'trans',
                xtype: 'chartaction',
                minHeight: 48,
                height: 48,
                defaults: {
                    margin: '0px 4px'
                },
                items: [{
                    xtype: 'coinpair',
                    arrow: false
                }, {
                    xtype: 'actionbutton',
                    text: 'Actions',
                    arrow: false,
                    plugins: {
                        responsive: true
                    },
                    responsiveConfig: {
                        "width <= 375": {
                            hidden: true
                        },
                        "width > 375": {
                            hidden: false
                        }
                    },
                    menu: {
                        anchor: true,
                        items: [{
                            iconCls: 'icofont-chart-arrows-axis',
                            text: 'Charts'
                        }, {
                            iconCls: 'icofont-clock-time',
                            text: '5s'
                        }, {
                            iconCls: 'icofont-chart-line',
                            text: 'Indicator'
                        }]
                    }

                }, '->', {
                    xtype: 'container',
                    layout: {
                        type: 'box',
                        vertical: true
                    },
                    items: [{
                        xtype: 'statisticbuy',
                        data: {
                            Percentage: '12%'
                        }
                    }, {
                        xtype: 'statisticsell',
                        data: {
                            Percentage: '12%'
                        }
                    },]
                }, {
                    xtype: 'trade',
                    text: 'Trade',
                    handler: function (button) {
                        button.runTimer(70);
                    }
                }]
            }
        }, {
            xtype: 'detail',
            minHeight: 145,
            docked: 'bottom',
            plugins: {
                responsive: true
            },
            layout: {
                type: 'box',
                vertical: true
            },
            responsiveConfig: {
                landscape: {
                    docked: 'right',
                    width: 200,
                    height: 'auto',
                    layout: {
                        pack: 'center'
                    },
                    padding: '8px 4px'
                },
                portrait: {
                    docked: 'bottom',
                    height: 140,
                    width: 'auto',
                    layout: {
                        pack: 'start'
                    },
                    padding: 4
                }
            },
            flex: 1,
            items: [{
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
                plugins: {
                    responsive: true
                },
                responsiveConfig: {
                    landscape: {
                        margin: '6px 0px'
                    },
                    portrait: {
                        margin: '4px 0px'
                    }
                },
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
                xtype: 'container',
                layout: {
                    type: 'box'
                },
                plugins: {
                    responsive: true
                },
                responsiveConfig: {
                    landscape: {
                        layout: {
                            vertical: true
                        }
                    },
                    portrait: {
                        layout: {
                            vertical: false
                        }
                    }
                },
                defaults: {
                    flex: 1
                },
                items: [{
                    plugins: {
                        responsive: true
                    },
                    responsiveConfig: {
                        landscape: {
                            iconAlign: 'top',
                            margin: '4px 2px 6px 0px'
                        },
                        portrait: {
                            iconAlign: 'left',
                            margin: '0px 2px 4px 0px'
                        }
                    },
                    xtype: 'buynow'
                }, {
                    plugins: {
                        responsive: true
                    },
                    responsiveConfig: {
                        landscape: {
                            iconAlign: 'top',
                            margin: '4px 2px 6px 0px'
                        },
                        portrait: {
                            iconAlign: 'left',
                            margin: '0px 2px 4px 0px'
                        }
                    },
                    xtype: 'sellnow',
                    margin: '0px 0px 4px 2px'
                }]
            }]
        }]
    }],
    getChartSection: function () {
        return this.down('chartsection');
    },
    listeners: {
        show: function (view) {
            TenchanChart.createChart('#chart-section');
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