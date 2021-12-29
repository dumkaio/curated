function isCalendlyEvent(e) {
  return e.data.event && e.data.event.indexOf('calendly') === 0;
}

const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQwNzk2MDg4LCJqdGkiOiJhZWU1OWFjYy04Yzg1LTQ3MDQtODNiYy04NDI3YWZjMjQyZGIiLCJ1c2VyX3V1aWQiOiIyNWE4ZGEwMy1hOGQ0LTRkZGEtYjg3OC1iY2ZkYWQxYzM3MzcifQ.5GxlbeMAY2L2gPjebEsbZVWHEvZoErYcuCBcuMvAa30';
window.addEventListener('message', function (e) {
  if (isCalendlyEvent(e)) {
    if (e.data.event === 'calendly.event_scheduled') {
      const inviteeUri = e.data.payload.invitee.uri;
      const settings = {
        async: true,
        crossDomain: true,
        url: inviteeUri,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      $.ajax(settings).done(function (response) {
        if (response && response.resource) {
          const email = response.resource.email;
          const params = {
            email,
          };
          const query = new URLSearchParams(window.location.search.toLowerCase());
          if (query.get('booking_source')) {
            params.booking_source = query.get('booking_source');
          }

          const zap = 'https://hooks.zapier.com/hooks/catch/11316060/b1tjxdr';
          $.ajax({
            type: 'POST',
            url: zap,
            data: params,
            dataType: 'json',
          });
        }
      });
    }
  }
});