function processMessagesWithLabelNext() {
  const processedLabel = GmailApp.getUserLabelByName("processed");
  const nextLabel = GmailApp.getUserLabelByName("next");
  const threads = nextLabel.getThreads();
  const url = 'https://todoist.com/API/v7/quick/add';

  threads.forEach(function(thread) {
     
    const msg = thread.getMessages()
    const subject = msg[0].getSubject()
    const id = thread.getId()
   
    const gmailLink  = 'https://mail.google.com/mail/u/0/?view=cv&fs=1&th=' + id + '&search=all'
    const markdownLink = '[' + subject + ']' + '(' + gmailLink +')'
    const text = markdownLink + ' @next #emails'
    
    thread
        .addLabel(processedLabel)
        .removeLabel(nextLabel)
        .refresh()
    
    
    
    var options = {
      "method" : "post",
      "payload" : {
        "token": "YOUR_TODOISTS_API_TOKEN",
        "text": text
      }
    };
    
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());   
  })
                    
}
