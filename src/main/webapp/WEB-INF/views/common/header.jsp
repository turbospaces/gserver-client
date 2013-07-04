<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="navbar navbar-fixed-top" id="mainNavBar">
    <div class="navbar-inner">
        <div class="container">
            <ul class="nav pull-right">
                <li><a href="#">Games</a></li>
                <li><a href="#settingsModal" data-toggle="modal">Settings</a></li>
                <li><a href="#signInModal" data-toggle="modal">Sign In</a></li>
            </ul>
        </div>
    </div>
</div>

<div id="signInModal" class="modal modal-small hide fade">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3>Sign In</h3>
    </div>
    <div class="modal-body">
        <form id="signin" action="<c:url value="/signin/authenticate" />" method="post">
            <fieldset>
                <input id="tbLogin"
                       name="j_username"
                       placeholder="Username Or Email"
                       type="text"
                       size="50"
                       required="required"
                       class="span4"/>
                <input id="tbPassword"
                       name="j_password"
                       placeholder="Password"
                       type="password"
                       size="50"
                       required="required"
                       class="span4"/>
            </fieldset>
            <button type="submit" class="btn btn-info">Sign In</button>
        </form>
        <form id="formFacebookSignin" action="<c:url value="/signin/facebook"/>" method="post">
            <input type="hidden" name="scope" value="publish_stream,user_photos,offline_access"/>
            <button type="submit" class="btn btn-link">
                <img src="<c:url value="/resources/social/sign-in-with-facebook.png"/>"/>
            </button>
        </form>
        <form id="formTwitterSignin" action="<c:url value="/signin/twitter"/>" method="post">
            <button type="submit" class="btn btn-link">
                <img src="<c:url value="/resources/social/sign-in-with-twitter-d.png"/>"/>
            </button>
        </form>
    </div>
</div>

<div id="settingsModal" class="modal hide fade">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3>Player Setting</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="displayName">Display Name</label>

                <div class="controls"><input type="text" id="displayName" required="required"></div>
            </div>
            <div class="control-group">
                <label class="control-label" for="cbCurrency">Currency</label>

                <div class="controls">
                    <select class="combobox" required="required" id="cbCurrency">
                        <option value="">Choose a currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="cbLanguage">Language</label>

                <div class="controls">
                    <select class="combobox" required="required" id="cbLanguage">
                        <option value="">Choose a Language</option>
                        <option value="en">English</option>
                        <option value="ru">Russian</option>
                        <option value="uk">Ukrainian</option>
                        <option value="de">German</option>
                        <option value="fr">French</option>
                        <option value="it">Italian</option>
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="disableMusicCheckbox">Music</label>

                <div class="controls">
                    <label class="checkbox"><input type="checkbox" id="disableMusicCheckbox">Disable music
                        content</label>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="disableBgMusicCheckbox">Background Music</label>

                <div class="controls">
                    <label class="checkbox"><input type="checkbox" id="disableBgMusicCheckbox">Disable background
                        effects content</label>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <a class="btn btn-inverse" data-dismiss="modal">Close</a>
        <a class="btn btn-primary">Save</a>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function () {
        $('#cbCurrency').combobox();
        $('#cbLanguage').combobox();
    });
</script>