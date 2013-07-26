<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<c:set var="game" value="${param.id}" scope="request"/>

<script src="<c:url value="/resources/js/json2.js" />"></script>
<script src="<c:url value="/resources/js/kinetic.min.js" />"></script>

<div class="row-fluid">
    <div class="span3"></div>
    <div class="span3" id="gameContainer1"></div>
    <div class="span3" id="gameContainer2"></div>
    <div class="span3">
        <table class="table table-hover table-condensed table-bordered">
            <caption>
                <strong><spring:message code="roulette.inside.bets"/></strong>
            </caption>
            <thead>
            <tr>
                <th><spring:message code="common.position"/></th>
                <th><spring:message code="common.payout"/></th>
                <th><spring:message code="common.odds"/></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.straight.up.tooltip"/>">
                        <spring:message code="roulette.straight.up"/>
                    </button>
                </td>
                <td><span>35:1</span></td>
                <td><span>38:1</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.split.bet.tooltip"/>">
                        <spring:message code="roulette.split.bet"/>
                    </button>
                </td>
                <td><span>17:1</span></td>
                <td><span>38:2</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.street.bet.tooltip"/>">
                        <spring:message code="roulette.street.bet"/>
                    </button>
                </td>
                <td><span>11:1</span></td>
                <td><span>38:3</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.corner.bet.tooltip"/>">
                        <spring:message code="roulette.corner.bet"/>
                    </button>
                </td>
                <td><span>8:1</span></td>
                <td><span>38:4</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.five.number.bet.tooltip"/>">
                        <spring:message code="roulette.five.number.bet"/>
                    </button>
                </td>
                <td><span>6:1</span></td>
                <td><span>38:5</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.line.bet.tooltip"/>">
                        <spring:message code="roulette.line.bet"/>
                    </button>
                </td>
                <td><span>5:1</span></td>
                <td><span>38:6</span></td>
            </tr>
            </tbody>
        </table>
        <table class="table table-hover table-condensed table-bordered" id="tblOutsideBets">
            <thead>
            <caption>
                <strong><spring:message code="roulette.outside.bets"/></strong>
            </caption>
            <tr>
                <th><spring:message code="common.position"/></th>
                <th><spring:message code="common.payout"/></th>
                <th><spring:message code="common.odds"/></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.column.bet.tooltip"/>">
                        <spring:message code="roulette.column.bet"/>
                    </button>
                </td>
                <td><span>2:1</span></td>
                <td><span>38:12</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.dozen.bet.tooltip"/>">
                        <spring:message code="roulette.dozen.bet"/>
                    </button>
                </td>
                <td><span>2:1</span></td>
                <td><span>38:12</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.red.or.black.bet.tooltip"/>">
                        <spring:message code="roulette.red.or.black"/>
                    </button>
                </td>
                <td><span>1:1</span></td>
                <td><span>38:18</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.even.or.odd.tooltip"/>">
                        <spring:message code="roulette.even.or.odd"/>
                    </button>
                </td>
                <td><span>1:1</span></td>
                <td><span>38:18</span></td>
            </tr>
            <tr>
                <td>
                    <button data-toggle="tooltip" title="<spring:message code="roulette.low.or.high.tooltip"/>">
                        <spring:message code="roulette.low.or.high"/>
                    </button>
                </td>
                <td><span>1:1</span></td>
                <td><span>38:18</span></td>
            </tr>
            </tbody>
        </table>
        <div class="row-fluid">
            <div class="span4">
                <button class="btn btn-inverse btn-block">Undo</button>
            </div>
            <div class="span4">
                <button class="btn btn-info btn-block">Auto</button>
            </div>
            <div class="span4">
                <button class="btn btn-success btn-block">Rebet</button>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span4">
                <button class="btn btn-danger btn-block">Clear</button>
            </div>
            <div class="span4">
                <button class="btn btn-warning btn-block">Double</button>
            </div>
            <div class="span4">
                <button class="btn btn-primary btn-block">Spin</button>
            </div>
        </div>
    </div>
</div>

<security:authorize access="isAuthenticated()">
    <script src="<c:url value="/resources/js/application.js" />"></script>
    <script src="<c:url value="/resources/js/transport.js" />"></script>
    <script src="<c:url value="/resources/js/common/bets.js" />"></script>
    <script src="<c:url value="/resources/js/common/balance.js" />"></script>
    <script src="<c:url value="/resources/js/games/${game}.js" />"></script>

    <script type="text/javascript" defer="defer">
        $("[data-toggle='tooltip']").tooltip();
        $('table.table-condensed tr').each(function () {
            $(this).find('td:nth-child(1) > button').addClass('btn-link btn-block');
            $(this).find('td:nth-child(2) > span').addClass('badge badge-success');
            $(this).find('td:nth-child(3) > span').addClass('badge badge-important');
        });
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
                        loadGame(transport);
                    }).fail(fail);
                }
            }, 250);
        });
    </script>
</security:authorize>