<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<c:set var="game" value="${param.id}" scope="request"/>

<script src="<c:url value="/resources/js/json2.js" />"></script>
<script src="<c:url value="/resources/js/kinetic.min.js" />"></script>

<div class="row-fluid">
    <div class="span2"></div>
    <div class="span8" id="gameContainer" style="border: 1px coral solid;"></div>
    <div class="span2" id="gameContainerSupport" style="border: 1px coral solid;">
        <table class="table table-striped">
            <thead>
            <tr>
                <th>position</th>
                <th>payout</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td id="td.roulette.straight.up"></td>
                <td>x</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="row-fluid">
    <div class="span2"></div>
    <div class="span8" id="controlsContainer">
        <div class="row-fluid">
            <div class="span2">
                <button class="btn btn-info btn-block">Auto</button>
            </div>
            <div class="span2">
                <button class="btn btn-inverse btn-block">Undo</button>
            </div>
            <div class="span2">
                <button class="btn btn-danger btn-block">Clear</button>
            </div>
            <div class="span2">
                <button class="btn btn-success btn-block">Rebet</button>
            </div>
            <div class="span2">
                <button class="btn btn-warning btn-block">Double</button>
            </div>
            <div class="span2">
                <button class="btn btn-primary btn-block">Spin</button>
            </div>
        </div>
    </div>
    <div class="span2"></div>
</div>

<security:authorize access="isAuthenticated()">
    <script src="<c:url value="/resources/js/application.js" />"></script>
    <script src="<c:url value="/resources/js/transport.js" />"></script>
    <script src="<c:url value="/resources/js/games/${game}.js" />"></script>
    <script type="text/javascript" defer="defer">
        $.getJSON('${getWSUrl}', function (wsToken) {
            var transport = new Transport(wsToken);
            var game = "${game}";
            var fail = function (reason) {
                sessvars.ui.serverFault(reason)
            };

            setTimeout(function () {
                if (transport.ws.readyState == 0) {
                    console.warn('still waiting for web-socket connect');
                }
                if (transport.ws.readyState == 1) {
                    transport.login(wsToken);
                    var openGamePlayPromise = transport.openGamePlay(game).done(function (reply) {
                        console.info("GamePlay session=%s has been created=%s", sessvars.ui.sessionId, JSON.stringify(sessvars.ui.game));
                        transport.geti18n('ru',
                                [
                                    'roulette.straight.up',
                                    'roulette.outside.bets',
                                    'roulette.low.or.high',
                                    'roulette.line.bet',
                                    'roulette.red.or.black',
                                    'roulette.dozen.bet',
                                    'roulette.even.or.odd',
                                    'roulette.five.number.bet',
                                    'roulette.inside.bets',
                                    'roulette.column.bet',
                                    'roulette.split.bet',
                                    'roulette.street.bet',
                                    'roulette.corner.bet'
                                ]).done(function(reply) {
                                    var values = reply["gserver.Geti18nMessagesReply.cmd"].values;
                                    for (var i = 0; i < 1; i++) {
                                        console.info('#td.' + values[i].key + ':::' + values[i].value);
                                        var cell = $('#td.' + values[i].key);
                                        cell.text(values[i].value);
                                    }
                                }).fail(fail);
                        loadGame({x: 0, y: 0}, transport);
                    }).fail(fail);
                }
            }, 250);
        });
    </script>
</security:authorize>