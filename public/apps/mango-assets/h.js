(function() {
  $(document).ready(function() {
    var state = {
      connected: false,
      name: ""
    };

    var connectPanel = {
      //DOM
      element: $(".panel-connect"),
      statusIcon: $(".glyphicon-one-fine-dot"),
      statusText: $(".text-status"),
      nameInput: $("#m"),
      connectButton: $("#btn"),

      //State Objects
      connect: { text: "Connect", class: "success" },
      disconnect: { text: "Disconnect", class: "danger" },
      //Helpers
      update: function(isConnected) {
        var currentState = null,
          futureState = null;
        if (isConnected) {
          futureState = this.disconnect;
          currentState = this.connect;
          this.nameInput.attr("disabled", "disabled");
        } else {
          currentState = this.disconnect;
          futureState = this.connect;
          this.nameInput.removeAttr("disabled");
        }
        this.statusIcon.removeClass("text-" + futureState.class);
        this.statusIcon.addClass("text-" + currentState.class);
        this.connectButton
          .attr("class", "btn btn-" + futureState.class)
          .html(futureState.text);
        this.statusText.html(currentState.text + "ed");
        state.connected = isConnected;
      }
    };

    var rowOptions = {
      container: $(".row-options"),
      optionTemplate: $("#row-option")
    };

    var label = $("#lbl"),
      loading = $("#loading"),
      form = $("form"),
      usersHeaderPanel = $(".panel-heading-users"),
      noUsersPanel = $("#panel-no-users"),
      listUsersPanel = $("#panel-users-list"),
      pannelInnerTemplate = $("#panel-body-inner-template"),
      panel = $(".panel-users");

    //Sidebar toggle
    $("[data-toggle=offcanvas]").click(function() {
      $(".row-offcanvas").toggleClass("active");
    });

    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function(data) {
        var name = data.results[0].name;
        connectPanel.nameInput.val(name.first + "_" + name.last);

        // $.ajax({
        //   url: "https://ranmoji.herokuapp.com/emojis/api/v.1.0/",
        //   dataType: "json",
        //   success: function(emoji) {
        //   }
        // });
      }
    });

    function renderOnlineUsers(data) {
      loading.show();
      data = jsonToMap(data);
      var size = !data || !data.size ? 0 : data.size;
      usersHeaderPanel.html(size + " Users Online");
      listUsersPanel.empty();

      if (!size) {
        noUsersPanel.show();
        loading.hide();
        return;
      }

      noUsersPanel.hide();

      for ([key, value] of data) {
        var temp = pannelInnerTemplate.clone();
        temp.removeAttr("id");
        var thisTime = new Date();
        var connectTime = new Date(value.connectTime);

        var timeElapsed = Math.round(
          (thisTime.getTime() - connectTime.getTime()) / 1000
        );

        var userFormat = `${key}${value.name === state.name ? " (You)" : ""}`;
        temp.html(temp.html().replace("#User", userFormat));
        listUsersPanel.append(temp);
      }
      loading.hide();
    }

    var jqxhr = $.getJSON("/onlineUsers", function(data) {
      renderOnlineUsers(JSON.stringify(data));
    });

    var socketProtocol = {
      socket: null,
      connect: function() {
        this.socket = io.connect("", {
          query: "name=" + state.name
        });

        this.socket.on("whos_connected", function(data) {
          renderOnlineUsers(data);
        });

        this.socket.on("connect", function() {
          connectPanel.update(true);
        });

        this.socket.on("disconnect", function() {
          connectPanel.update(false);
          renderOnlineUsers(null);
        });
      },
      disconnect: function() {
        this.socket.disconnect();
      }
    };

    $("body").on("click", ".thumbnail", function(event) {
      var idx = $(this).attr("index");
      socketProtocol.socket.emit("selected_option", idx);
    });

    form.submit(function() {
      state.name = connectPanel.nameInput.val();

      if (!state.connected) {
        socketProtocol.connect();

        rowOptions.container.empty();
        for (var i = 0; i < 4; i++) {
          var newOption = rowOptions.optionTemplate.clone();
          newOption.show();
          newOption.find("h3").html("Option " + (i + 1));
          newOption.find("p").html("Some content");
          newOption.find(".thumbnail").attr("index", i);
          rowOptions.container.append(newOption);
        }
      } else {
        socketProtocol.disconnect();
      }

      return false;
    });
  });
})();
