/**
 * refer http://bl.ocks.org/andredumas/27c4a333b0e0813e093d
 * gallery: https://github.com/andredumas/techan.js/wiki/Gallery
 * tooltips: http://bl.ocks.org/shashank2104/a5928e82ef426aabb0103f93a8fb5f0e position is incorrect
 */
Ext.define('Bidmo.view.shared.chart.TechanChart', {

        alternateClassName: 'TenchanChart',
        singleton: true,
        marginDesktop: { top: 20, right: 100, bottom: 50, left: 20 },
        margin: { top: 10, right: 10, bottom: 30, left: 30 },
        chart: {},
        setupSize: function (margin) {
                var tbHeight = 48 * 2;
                var detailWidth = 200;
                var detailHeight = 145;
                var win = window, w, h;
                var orientation = Ext.Viewport.getOrientation();
                var deviceType = Ext.os.deviceType;
                var width = win.innerWidth;
                var height = win.innerHeight;
                if (deviceType === 'Desktop') {
                        w = width - 300;
                        h = height - 76 - 64;
                } else {

                        if (orientation === 'landscape') {
                                w = width - detailWidth;
                                h = height - tbHeight;
                        } else {
                                w = width;
                                h = height - detailHeight - tbHeight;
                        }
                }


                width = w - margin.left - margin.right;
                height = h - margin.top - margin.bottom;
                return { width: width, height: height };
        },
        // sample chart with hardcode position
        createChart: function (id) {
                var me = this;
                var deviceType = Ext.os.deviceType;
                var margin = me.margin;
                var chart = me.chart;
                if (deviceType === 'Desktop') {
                        margin = me.marginDesktop;
                }
                var dataPath = Ext.getResourcePath('data-simple.csv', null, 'data');
                var size = me.setupSize(margin);
                var width = size.width;
                var height = size.height;
                var parseDate = d3.timeParse("%d-%b-%y");

                // create x range
                var x = techan.scale.financetime()
                        .range([0, width]);

                // create y range
                var y = d3.scaleLinear()
                        .range([height, 0]);

                // create y volume
                var yVolume = d3.scaleLinear()
                        .range([y(0), y(0.2)]);

                // candlestick
                var candlestick = techan.plot.candlestick()
                        .xScale(x)
                        .yScale(y);

                var sma0 = techan.plot.sma()
                        .xScale(x)
                        .yScale(y);

                var sma0Calculator = techan.indicator.sma()
                        .period(10);

                var sma1 = techan.plot.sma()
                        .xScale(x)
                        .yScale(y);

                var sma1Calculator = techan.indicator.sma()
                        .period(20);

                // ohlc volume
                var volume = techan.plot.volume()
                        .accessor(candlestick.accessor())   // Set the accessor to a ohlc accessor so we get highlighted bars
                        .xScale(x)
                        .yScale(yVolume);






                var xAxis = d3.axisBottom()
                        .scale(x);

                var yAxis = d3.axisLeft()
                        .scale(y);

                var volumeAxis = d3.axisRight(yVolume)
                        .ticks(3)
                        .tickFormat(d3.format(",.3s"));

                // time annovation
                var timeAnnotation = techan.plot.axisannotation()
                        .axis(xAxis)
                        .orient('bottom')
                        .format(d3.timeFormat('%Y-%m-%d'))
                        .width(65)
                        .translate([0, height]);

                // ohlc annotation
                var candlestickAnnotation = techan.plot.axisannotation()
                        .axis(yAxis)
                        .orient('left')
                        .format(d3.format(',.2f'));

                // volumn annotation
                var volumeAnnotation = techan.plot.axisannotation()
                        .axis(volumeAxis)
                        .orient('right')
                        .width(35);

                // crosshair
                var crosshair = techan.plot.crosshair()
                        .xScale(x)
                        .yScale(y)
                        .xAnnotation(timeAnnotation)
                        .yAnnotation([candlestickAnnotation, volumeAnnotation])
                        .on("move", me.move);



                var highSvg = d3.select(id).append("svg");
                highSvg.attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom);


                var defs = highSvg.append("defs");

                defs = defs.append("clipPath")
                        .attr("id", "ohlcClip");
                var rect = defs.append("rect")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr("width", width)
                        .attr("height", height);

                svg = highSvg.append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var ohlcSelection = svg.append("g")
                        .attr("class", "ohlc")
                        .attr("transform", "translate(0,0)");

                ohlcSelection.append("g")
                        .attr("class", "volume")
                        .attr("clip-path", "url(#ohlcClip)");

                ohlcSelection.append("g")
                        .attr("class", "candlestick")
                        .attr("clip-path", "url(#ohlcClip)");

                chart.xAxis = svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")");

                chart.yAxis = svg.append("g")
                        .attr("class", "y axis")
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end");
                svg.append("g")
                        .attr("class", "volume axis");

                svg.append('g')
                        .attr("class", "crosshair ohlc");
                var coordsText = svg.append('text')
                        .style("text-anchor", "end")
                        .attr("class", "coords")
                        .attr("x", width - 5)
                        .attr("y", 15);




                chart.x = x;
                chart.y = y;
                chart.yVolume = yVolume;
                chart.candlestick = candlestick;
                chart.sma0 = sma0;
                chart.sma0Calculator = sma0Calculator;
                chart.sma1 = sma1;
                chart.sma1Calculator = sma1Calculator;
                chart.volume = volume;
                chart.xAxisScale = xAxis;
                chart.yAxisScale = yAxis;
                chart.volumeAxis = volumeAxis;
                chart.timeAnnotation = timeAnnotation;
                chart.candlestickAnnotation = candlestickAnnotation;
                chart.volumeAnnotation = volumeAnnotation;
                chart.crosshair = crosshair;
                chart.highSvg = highSvg;
                chart.defs = defs;
                chart.rect = rect;
                chart.svg = svg;
                chart.ohlcSelection = ohlcSelection;

                chart.coordsText = coordsText;
                var feed;
                d3.csv(dataPath, function (error, data) {
                        var accessor = candlestick.accessor();
                        me.feed = feed = data.slice(0, 200).map(function (d) {
                                return {
                                        date: parseDate(d.Date),
                                        open: +d.Open,
                                        high: +d.High,
                                        low: +d.Low,
                                        close: +d.Close,
                                        volume: +d.Volume
                                };
                        }).sort(function (a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

                        me.redraw(feed.slice(0, 163));
                        //redraw(feed.slice(0, 163));
                });
        },
        redraw: function (data) {
                var me = this;
                var chart = me.chart;
                var feed = me.feed;
                if (Ext.Object.isEmpty(chart)) return false;
                me.resizeChart();
                candlestick = chart.candlestick;
                x = chart.x;
                y = chart.y;
                yVolume = chart.yVolume;
                svg = chart.svg;
                xAxis = chart.xAxisScale;
                yAxis = chart.yAxisScale;
                volumeAxis = chart.volumeAxis;
                sma0 = chart.sma0;
                sma1 = chart.sma1;
                volume = chart.volume;
                sma0Calculator = chart.sma0Calculator;
                sma1Calculator = chart.sma1Calculator;
                crosshair = chart.crosshair;

                var accessor = candlestick.accessor();

                x.domain(data.map(accessor.d));
                // Show only 150 points on the plot
                x.zoomable().domain([data.length - 130, data.length]);

                // Update y scale min max, only on viewable zoomable.domain()
                y.domain(techan.scale.plot.ohlc(data.slice(data.length - 130, data.length)).domain());
                yVolume.domain(techan.scale.plot.volume(data.slice(data.length - 130, data.length)).domain());

                // Setup a transition for all that support
                svg.each(function () {
                        var selection = d3.select(this);
                        selection.select('g.x.axis').call(xAxis);
                        selection.select('g.y.axis').call(yAxis);
                        selection.select("g.volume.axis").call(volumeAxis);
                        selection.select("g.candlestick").datum(data).call(candlestick);
                        selection.select("g.sma.ma-0").datum(sma0Calculator(data)).call(sma0);
                        selection.select("g.sma.ma-1").datum(sma1Calculator(data)).call(sma1);
                        selection.select("g.volume").datum(data).call(volume);
                        svg.select("g.crosshair.ohlc").call(crosshair);
                });

                if (me.setTimeout) {
                        clearTimeout(me.setTimeout);
                }
                // Set next timer expiry
                me.setTimeout = setTimeout(function () {
                        var newData;
                        if (data.length < feed.length) {
                                // Simulate a daily feed
                                newData = feed.slice(0, data.length + 1);
                        }
                        else {
                                // Simulate intra day updates when no feed is left
                                var last = data[data.length - 1];
                                // Last must be between high and low
                                last.close = Math.round(((last.high - last.low) * Math.random()) * 10) / 10 + last.low;

                                newData = data;
                                return false;
                        }

                        me.redraw(newData);
                }, (Math.random() * 1000) + 400); // Randomly pick an interval to update the chart
        },
        resizeChart: function () {
                var me = this,
                        chart = me.chart;
                if (Ext.Object.isEmpty(chart)) {
                        return false;
                }
                var deviceType = Ext.os.deviceType;
                var margin = me.margin;
                if (deviceType === 'Desktop') {
                        margin = me.marginDesktop;
                }
                var size = me.setupSize(margin);
                var width = size.width;
                var height = size.height;
                var svg = chart.svg,
                        highSvg = chart.highSvg,
                        candlestick = chart.candlestick,
                        x = chart.x,
                        y = chart.y,
                        yVolume = chart.yVolume,
                        timeAnnotation = chart.timeAnnotation,
                        candlestickAnnotation = chart.candlestickAnnotation,
                        volumeAnnotation = chart.volumeAnnotation,
                        volumeAxis = chart.volumeAxis,
                        xAxisScale = chart.xAxisScale,
                        yAxisScale = chart.yAxisScale;

                chart.x = x = techan.scale.financetime()
                        .range([0, width]);
                chart.y = y = d3.scaleLinear()
                        .range([height, 0]);

                chart.candlestick = candlestick = techan.plot.candlestick()
                        .xScale(x)
                        .yScale(y);
                chart.sma0 = sma0 = techan.plot.sma()
                        .xScale(x)
                        .yScale(y);
                chart.sma1 = sma1 = techan.plot.sma()
                        .xScale(x)
                        .yScale(y);
                chart.volumn = volume = techan.plot.volume()
                        .accessor(candlestick.accessor())   // Set the accessor to a ohlc accessor so we get highlighted bars
                        .xScale(x)
                        .yScale(yVolume);
                chart.xAxisScale = xAxisScale = d3.axisBottom()
                        .scale(x);
                chart.yAxisScale = yAxisScale = d3.axisLeft()
                        .scale(y);
                /* chart.timeAnnotation = timeAnnotation = techan.plot.axisannotation()
                        .axis(xAxisScale)
                        .translate([0, height]); */

                chart.candlestickAnnotation = candlestickAnnotation = techan.plot.axisannotation()
                        .axis(yAxisScale)
                        .orient('left')
                        .format(d3.format(',.2f'));
                chart.volumeAnnotation = volumeAnnotation = techan.plot.axisannotation()
                        .axis(volumeAxis)
                        .orient('right')
                        .width(35);

                chart.crosshair = techan.plot.crosshair()
                        .xScale(x)
                        .yScale(y)
                        .xAnnotation(timeAnnotation)
                        .yAnnotation([candlestickAnnotation, volumeAnnotation])
                        .on("move", me.move);

                chart.highSvg = highSvg.attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom);

                chart.rect.attr("width", width)
                        .attr("height", height);

                chart.xAxis.attr("transform", "translate(0," + height + ")")
                        .attr("width", width);
                chart.yAxis.attr("height", height);

                chart.svg = svg.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                chart.coordsText.attr("x", width - 5);
        },
        move: function (coords) {
                var chart = TenchanChart.chart;
                var coordsText = chart.coordsText;
                var candlestickAnnotation = chart.candlestickAnnotation;
                var timeAnnotation = chart.timeAnnotation;
                coordsText.text(
                        timeAnnotation.format()(coords.x) + ", " + candlestickAnnotation.format()(coords.y)
                );
        }
});