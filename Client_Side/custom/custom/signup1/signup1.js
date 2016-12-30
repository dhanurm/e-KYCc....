$('document').ready(function(){

      $("#datepicker").datepicker({
            dateFormat:"yy-mm-dd",
            showWeek: true,
            changeMonth: true,
            changeYear: true,
            yearRange:"-116:+0",
            beforeShow: function (textbox, instance) {
                  instance.dpDiv.css({
                  marginLeft: textbox.offsetWidth+(7)+'px'
                  });
            }
      });
});