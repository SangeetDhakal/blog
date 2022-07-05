import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8238237760332886"
						crossorigin="anonymous"
					></script>
					{/* Global Site Tag (gtag.js) - Google Analytics */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>

					<meta name="application-name" content="Wiki Stacks" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content="Wiki Stacks" />
					<meta
						name="description"
						content="Wiki, News & Entertainment related to your favourite celebs!!!"
					/>
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta
						name="msapplication-config"
						content="/Static/icons/browserconfig.xml"
					/>
					<meta name="msapplication-TileColor" content="#2B5797" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="theme-color" content="#000000" />

					<link
						rel="apple-touch-icon"
						href="/Static/icons/touch-icon-iphone.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/Static/icons/touch-icon-ipad.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/Static/icons/touch-icon-iphone-retina.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="167x167"
						href="/Static/icons/touch-icon-ipad-retina.png"
					/>

					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/Static/icons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/Static/icons/favicon-16x16.png"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link
						rel="mask-icon"
						href="/Static/icons/safari-pinned-tab.svg"
						color="#5bbad5"
					/>
					<link rel="shortcut icon" href="/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Lato:300,400,700,100italic,300italic"
					/>

					<meta charSet="UTF-8" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
					/>

					{/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          /> */}

					<link rel="stylesheet" href="/Static/css/bar.module.css" />
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
