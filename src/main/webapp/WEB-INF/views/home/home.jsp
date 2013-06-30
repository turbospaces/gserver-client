<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<h1>welcome!!</h1>
<div id="gameContainer" style="border: 1px coral solid;"></div>
<script src="<c:url value="/resources/js/games/roulette.js" />"></script>
<script defer="defer">loadRoulette();</script>