## Bug Fix Report

### Summary of First bug

- **Title**: Username Input Box Not Displaying and Messages Not Sent to Backend
- **Report Date**: November 16, 2023
- **Status**: Fixed

## Description

The username input box was not displaying, and messages were not being sent to the backend. This issue was due to the incorrect order of arguments in the sendMessage function. The localUser and localMessage parameters were mistakenly swapped.

### Steps to Reproduce

1. Open the application and access the chat feature.
2. Attempt to input a username in the provided input box.
3. Try sending a message.
4. Observe that the username is not displayed and the message is not sent to the backend.

### Expected Behavior

The username should be displayed in the input box, and messages should be correctly sent to the backend with the username.

### Actual Behavior

The username input box is not displaying, and messages are not being sent to the backend.

### Fix Description

Corrected the parameter order in the sendMessage function call. Swapped localUser and localMessage to reflect the correct sequence.

### Code Changes

\- chatClient.sendMessage(localUser, localMessage);

\+ chatClient.sendMessage(localMessage, localUser);


### Summary of Second bug

- **Title**: First message not sent to front end due to incorrect index checking
- **Report Date**: November 17, 2023
- **Status**: Fixed

### Description

The first message in a series was not being sent to the front-end. This was traced back to an incorrect index check in the message sending logic, where the index check should be `-1` but was incorrectly set as `0`.

### Steps to Reproduce

1. Start the application and initiate a messaging session.
2. Send the first message from the back-end.
3. Observe that the first message does not appear in the front-end interface.

### Expected Behavior

All messages, including the first message in a series, should be correctly sent and displayed in the front-end.

### Actual Behavior

The first message is skipped and not sent to the front-end, leading to a missing message in the conversation flow.

### Fix Description

Modified the conditional check for the message index from `0` to `-1`, ensuring that the first message in the series is correctly recognized and sent.

### Test Cases

#### 1. First Message Test

- **Objective**: Ensure the first message is correctly sent and appears in the front-end.
- **Procedure**:
  1. Start the application and initiate a messaging session.
  2. Send the first message from the back-end.
  3. Verify that the first message is displayed in the front-end interface.
- **Expected Result**: The first message should be visible in the front-end.

#### 2. Sequential Message Test

- **Objective**: Confirm that subsequent messages follow the first message without issues.
- **Procedure**:
  1. After the first message test, continue sending messages.
  2. Observe the order and display of these messages in the front-end.
- **Expected Result**: All messages should be displayed in sequential order following the first message.

#### 3. Regression Testing

- **Objective**: Ensure that the fix has not adversely affected other functionalities.
- **Procedure**:
  1. Perform various operations within the application that are related and unrelated to messaging.
  2. Monitor for any unexpected behavior or errors.
- **Expected Result**: No new issues or regressions should be observed in the application.

### Code Changes

\- const [mostRecentId, setMostRecentId] = useState<number>(0);

\+ const [mostRecentId, setMostRecentId] = useState<number>(-1);

### Summary of Third bug

- **Title**: Inability to Read Files After Deployment to Render.com
- **Report Date**: November 17, 2023
- **Status**: Fixed

### Description

After deploying the application to Render.com, the system was unable to read files. This was traced back to an incorrect URL formation for accessing documents. The error was due to using a dynamic server port and hostname combination (spreadsheet-server:${serverPort}) instead of the static Render.com domain.

### Steps to Reproduce

1. Deploy the application to Render.com.
2. Attempt to access any document or file from the application.
3. Observe the failure in accessing the files and the resulting error.

### Expected Behavior

The application should successfully read and display files after deployment on Render.com.

### Actual Behavior

The application fails to read files due to incorrect URL formatting, leading to an inability to access documents.

### Fix Description

Modified the URL used to access documents from a dynamic server and port reference to the static URL https://spreadsheet-server.onrender.com/documents.

### Code Changes
\- `https://spreadsheet-server:${serverPort}/documents`

\+ `https://spreadsheet-server.onrender.com/documents`