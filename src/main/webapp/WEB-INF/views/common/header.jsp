<div class="navbar navbar-fixed-top" id="mainNavBar">
    <div class="navbar-inner">
        <div class="container">
            <ul class="nav">
                <li class="active">
                    <a class="brand" href="#">About</a>
                </li>
                <li><a href="#">Games</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <ul class="nav pull-right">
                <li>
                    <a href="#settingsModal" data-toggle="modal">Settings</a>
                </li>
                <li>
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Log In</a>
                </li>
            </ul>
        </div>
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
                <div class="controls"><input type="text" id="displayName"></div>
            </div>
            <div class="control-group">
                <label class="control-label" for="currencyDiv">Currency</label>
                <div class="controls">
                    <div id="currencyDiv" class="input-append dropdown combobox">
                        <input class="span2" type="text">
                        <button type="button" class="btn" data-toggle="dropdown"><i class="caret"></i></button>
                        <ul class="dropdown-menu">
                            <li><a>Item One</a></li>
                            <li><a>Item Two</a></li>
                            <li><a>Item Three</a></li>
                            <li class="divider"></li>
                            <li><a>Item After Divider</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <a class="btn btn-inverse" data-dismiss="modal">Close</a>
        <a class="btn btn-primary">Save</a>
    </div>
</div>