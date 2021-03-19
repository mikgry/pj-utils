(function()
{
  widget(window.jQuery);

  function widget(jQuery)
  {
    var serviceUrl     = 'https://konto.lubimyczytac.pl/lcwidget/getdata?jsoncallback=?';

      var linkSuffix    = '?utm_source=widget_wklejki&utm_medium=widget_wklejki&utm_campaign=wklejki+na+bloga';
    var stylesheetUrl = 'https://s-konto.lubimyczytac.pl/skins/lc/css/widget/lubimyczytacpl-widget-';
    var profileUrl    = 'https://konto.lubimyczytac.pl/profil/';
    var bookUrl       = 'https://konto.lubimyczytac.pl/ksiazka/';

    var userId       = '1722533';
    var width        = '220';
    var shelfsNow    = '3';
    var shelfsRead   = '3';
    var shelfsWant   = '3';
    var showUsername = '1';
    var showAvatar   = '1';
    var showLibrary  = '1';
    var showBorder   = '1';
    var color        = 'dark-transparent';

    jQuery(document).ready(function()
    {
      jQuery('#lubimyczytacpl-widget').after('<div id="lubimyczytacpl-widget-container"><div id="lubimyczytacpl-widget-column"></div></div>');
      jQuery.getJSON(serviceUrl,
        {
            uid       : userId,
            now       : shelfsNow,
            read      : shelfsRead,
            want      : shelfsWant,
                          susername : showUsername,
            savatar   : showAvatar,
            slibrary  : showLibrary,
        },
        function(data)
        {
          if (data.data.status === "success")
            buildWidget(data.data);
          else
            buildWidgetError(data.data);
        }
      ).fail(function()
      {
        jQuery('#lubimyczytacpl-widget-column').append(prepareErrorMessage('Nie można wyświetlić widgetu z powodu błędu')+prepareFooter());
      });
    });

    function buildWidget(data)
    {
      preBuildWidget();

      if (data.avatar || data.username)
      {
        jQuery('#lubimyczytacpl-widget-column').append(prepareHeader(data.avatar, data.username));
      }
      if (data.amount)
      {
        jQuery('#lubimyczytacpl-widget-column').append(prepareLibrary(data.username, data.usernameseo, data.amount));
      }
      jQuery('#lubimyczytacpl-widget-column').append(prepareShelf(data.username, data.usernameseo, data.shelfs));
      jQuery('#lubimyczytacpl-widget-column').append(prepareFooter());
      jQuery('li.lubimyczytacpl').addClass(getMarginClass());
    }

    function buildWidgetError(data)
    {
      preBuildWidget();

      jQuery('#lubimyczytacpl-widget-column').append(prepareErrorMessage(data.msg)+prepareFooter());
    }

    function prepareErrorMessage(message)
    {
      return '<div><p>'+message+'</p></div>';
    }

    function preBuildWidget()
    {
      var stylesheetType = '';

      switch (color)
      {
        case 'bright':
          stylesheetType = 'bright';
          break;
        case 'dark':
          stylesheetType = 'dark';
          break;
        case 'bright-transparent':
          stylesheetType = 'bright-transparent';
          break;
        case 'dark-transparent':
          stylesheetType = 'dark-transparent';
          break;
        default:
          stylesheetType = 'bright';
      }

      if (showBorder == '1')
      {
        jQuery('#lubimyczytacpl-widget-container').addClass('lubimyczytacpl-border');
      }

      jQuery('#lubimyczytacpl-widget-column').addClass(getMarginClass());
    }

    function getMarginClass()
    {
      var marginClass;

      switch (width)
      {
        case '190':
          marginClass = 'lubimyczytacpl-margin-2';
          break;
        case '220':
          marginClass = 'lubimyczytacpl-margin-3';
          break;
        case '300':
          marginClass = 'lubimyczytacpl-margin-4';
          break;
        case '500':
          marginClass = 'lubimyczytacpl-margin-7';
          break;
        case '750':
          marginClass = 'lubimyczytacpl-margin-11';
          break;
        default:
          marginClass = 'lubimyczytacpl-margin-3';
      }

      return marginClass;
    }

    function getBackgroundClass()
    {
      var marginClass;

      switch (width)
      {
        case '190':
          backgroundClass = 'lubimyczytacpl-background-2';
          break;
        case '220':
          backgroundClass = 'lubimyczytacpl-background-3';
          break;
        case '300':
          backgroundClass = 'lubimyczytacpl-background-4';
          break;
        case '500':
          backgroundClass = 'lubimyczytacpl-background-7';
          break;
        case '750':
          backgroundClass = 'lubimyczytacpl-background-11';
          break;
        default:
          backgroundClass = 'lubimyczytacpl-background-3';
      }

      return backgroundClass;
    }

    function prepareHeader(avatar, username)
    {
      var html = '<div class="lubimyczytacpl-box">';

      if (avatar)
      {
        html += '<div class="lubimyczytacpl-avatar mb-2 mr-2"><a href="'+profileUrl+userId+linkSuffix+'" target="_blank" title="Profil czytelnika na lubimyczytać.pl" class="lubimyczytacpl"><img src="'+avatar+'" class="lubimyczytacpl" /></a></div>';
      }

      if (username)
      {
        html += '<div class="lubimyczytacpl-username"><a href="'+profileUrl+userId+linkSuffix+'" target="_blank" title="Profil czytelnika na lubimyczytać.pl" class="lubimyczytacpl">Panna Jagiellonka<br /><span class="lubimyczytacpl-website">na </span><span class="lubimyczytacpl-website lubimyczytacpl-accent">lubimy</span><span class="lubimyczytacpl-website">czytać.pl</span></a></div>';
      }

      html += '<div class="lubimyczytacpl-clr"></div></div>';

      return html;
    }

    function prepareLibrary(username, usernameseo, libraryAmount)
    {
      return '<div class="lubimyczytacpl-box '+getBackgroundClass()+'"><div class="lubimyczytacpl-library"></div><p class="lubimyczytacpl-library"><a href="'+profileUrl+userId+'/'+usernameseo+'/biblioteczka/lista'+linkSuffix+'" target="_blank" title="Książki w biblioteczce czytelnika" class="lubimyczytacpl">Biblioteczka: <span class="lubimyczytacpl-accent">'+libraryAmount+'</span></a></p><div class="lubimyczytacpl-clr"></div></div>';
    }

    function prepareShelf(username, usernameseo, shelfs)
    {
      var html = '';

      if (shelfs)
      {
        jQuery.each(shelfs, function(shelfType, shelf)
        {
          html += '<div class="lubimyczytacpl-box '+getBackgroundClass()+'"><p class="lubimyczytacpl-shelf"><a href="'+profileUrl+userId+'/'+usernameseo+'/polka/'+shelf.url+linkSuffix+'" target="_blank" class="lubimyczytacpl">'+shelf.name+': <span class="lubimyczytacpl-accent">'+shelf.amount+'</span></a></p>'+prepareBooks(shelf.books)+'</div>';
        });
      }

      return html;
    }

    
    function prepareBooks(books)
    {
      var html     = '<ul class="lubimyczytacpl">';

      jQuery.each(books, function(num, book)
      {
        html += '<li class="lubimyczytacpl"><a href="'+book.url+linkSuffix+'" target="_blank" class="lubimyczytacpl"><img class="lubimyczytacpl-cover mb-2" src="'+book.cover+'" alt="'+book.title+'" title="'+book.title+'" /></a></li>';
      });

      html += '</ul>';

      return html;
    }

    function prepareFooter()
    {
      return '<div class="'+getBackgroundClass()+'"><div class="lubimyczytacpl-footer-container d-flex justify-content-center"><div class="lubimyczytacpl-logo"></div><div><a href="http://lubimyczytac.pl/'+linkSuffix+'" target="_blank" class="lubimyczytacpl lubimyczytacpl-website" title="lubimyczytać.pl - Twoja Internetowa Biblioteczka"><span class="lubimyczytacpl-accent">lubimy</span>czytać.pl</a></div><div class="lubimyczytacpl-clr"></div></div></div>';
    }
  }

})();
