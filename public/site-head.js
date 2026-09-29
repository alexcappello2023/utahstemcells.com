/* ============================================================================
   site-head.js  —  CODICI DA INIETTARE NEL <head> DI TUTTE LE PAGINE
   ----------------------------------------------------------------------------
   COME SI USA (dal 2026-09-29 i codici vivono QUI, nel repository):
     1. Modifica la variabile HEAD_HTML qui sotto (tra i backtick).
     2. Committa e lancia il workflow "Deploy sito (FTP)".
     3. Fatto: il codice e applicato a tutte le pagine.

   ⚠️  NON modificare piu questo file sul server via cPanel: il primo deploy
   che tocca questo file sovrascrive la copia remota e la tua modifica sparisce
   senza errori. E successo con il tag Google Ads, aggiunto a mano il 17 agosto
   2026 e sopravvissuto solo perche nessuno aveva piu toccato il file nel repo.

   Puoi incollare qualsiasi cosa che andrebbe nel <head>:
     <script>...</script>   <script src="..."></script>   <meta ...>   <noscript>...
   Gli <script> vengono eseguiti correttamente (non solo inseriti come testo).

   ⚠️  NOTE
   - Verifica Google Search Console: usa il metodo "File HTML" o "DNS", NON il
     meta tag qui dentro (il crawler di verifica potrebbe non eseguire il JS).
   - Se in futuro ricarichi l'INTERO sito, ricontrolla che questo file contenga
     ancora i tuoi codici (tienine una copia).
   ========================================================================== */

var HEAD_HTML = `

  <!-- ▼▼▼  INCOLLA QUI SOTTO I TUOI CODICI  ▼▼▼ -->

  <!-- Google tag (gtag.js) — un solo loader per GA4 e Google Ads -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-F3CR83NYS8"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-F3CR83NYS8');    /* Google Analytics 4 */
    gtag('config', 'AW-18394596324');  /* Google Ads */
  </script>

  <!-- ▲▲▲  INCOLLA QUI SOPRA I TUOI CODICI  ▲▲▲ -->

`;

/* ---------------------------------------------------------------------------
   ESEMPI PRONTI (rimuovi le /* */ /* e incolla dentro HEAD_HTML per attivarli):

   ►  Google Analytics 4  — sostituisci G-XXXXXXXXXX con il tuo ID:
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      </script>

   ►  Meta (Facebook) Pixel  — sostituisci 000000000000000 con il tuo Pixel ID:
      <script>
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '000000000000000');
        fbq('track', 'PageView');
      </script>

   ►  Google Tag Manager  — sostituisci GTM-XXXXXXX con il tuo ID:
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
   --------------------------------------------------------------------------- */

/* =====================  NON MODIFICARE DA QUI IN GIÙ  ===================== */
(function () {
	if (!HEAD_HTML || !HEAD_HTML.trim()) return;
	var head = document.head || document.getElementsByTagName('head')[0];
	var tpl = document.createElement('template');
	tpl.innerHTML = HEAD_HTML;
	Array.prototype.forEach.call(tpl.content.childNodes, function (node) {
		if (node.nodeType !== 1) return; // salta testo/commenti
		if (node.tagName === 'SCRIPT') {
			// ricrea lo <script> così il browser lo esegue
			var s = document.createElement('script');
			for (var i = 0; i < node.attributes.length; i++) {
				s.setAttribute(node.attributes[i].name, node.attributes[i].value);
			}
			s.text = node.textContent;
			head.appendChild(s);
		} else {
			head.appendChild(node.cloneNode(true));
		}
	});
})();
