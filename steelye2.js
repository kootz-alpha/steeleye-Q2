function getHTMLvsPlanTextArray(htmlContent, plainText) {

    let i = 0, j = 0, htmlStart = -1, plainStart = -1, n = htmlContent.length, m = plainText.length;
    let opened = false;

    let ans = [];

    while (i < n && j < m) {

        if (plainStart == -1 && j < m && plainText[j] == ' ') {

            j++;
            continue;
        }

        if (opened) {

            if (htmlContent[i] != '>') {

                i++;
            }
            else {

                opened = false;
                i++;
            }
        }
        else {

            if (htmlContent[i] == '<') {

                opened = true;

                if (htmlStart != -1) {

                    ans.push([plainStart, htmlStart]);
                    htmlStart = -1;
                    plainStart = -1;
                    j++;
                }

                i++;
            }
            else if (htmlContent[i] == ' ') {

                if (htmlStart != -1) {

                    ans.push([plainStart, htmlStart]);
                    htmlStart = -1;
                    plainStart = -1;
                    j++;
                }
                i++;
            }
            else {

                if (htmlStart == -1) {

                    htmlStart = i;
                    plainStart = j;
                }

                i++;
                j++;
            }
        }
    }

    return ans;
}

function solve(htmlVsPlainTextArray, plainTextPositions, htmlContent) {

    let res = "";
    let j = 0, n = htmlVsPlainTextArray.length, m = plainTextPositions.length, starti = 0;

    for (let i = 0; i < n; i++) {

        if (j >= m)
            break;

        if (htmlVsPlainTextArray[i][0] == plainTextPositions[j].start) {

            res += htmlContent.substring(starti, htmlVsPlainTextArray[i][1]);
            res += "<mark>";
            res += htmlContent.substring(htmlVsPlainTextArray[i][1], htmlVsPlainTextArray[i][1]+plainTextPositions[j].end-plainTextPositions[j].start);
            res += "</mark>";
            starti = htmlVsPlainTextArray[i][1]+plainTextPositions[j].end-plainTextPositions[j].start;
            j++;
        }
    }

    if (starti < htmlContent.length) {

        res += htmlContent.substring(starti);
    }

    return res;
}

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    // your logic goes here

    let htmlVsPlainTextArray = getHTMLvsPlanTextArray(htmlContent, plainText);

    return solve(htmlVsPlainTextArray, plainTextPositions, htmlContent);
}

const htmlContent = ' <p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
const plainText = 'Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------';
const plainTextPositions = [
    {
        start: 241,
        end: 247,
    },
    {
        start: 518,
        end: 525,
    }
];

const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
console.log(highlightedContent);