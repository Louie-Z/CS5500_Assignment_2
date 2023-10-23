Software Structure as per the UML:
Model:
Represents the data and the business logic of the application. It's responsible for retrieving, storing, and processing data. It also defines the rules for data validation and processing.

* FormulaEvaluator.tsx 
* CalculationManager.ts
* Cell.ts
* FormulaBuilder.ts
* SheetMemory.ts
* GlobalDefinition.ts
* ContributingUser.ts
* DocumentHolder.ts

Controller:
Acts as an interface between the Model and the View. It takes the user input from the view, processes it (with possible updates to the model), and returns the display output to the view

* index.tsx
* reportWebvuds.ts
* SpreadsheetClient.ts
* SpreadsheetController.ts

View:
Represents the UI of the application. It displays the data that the model retrieves to the users and sends user commands to the controller.

* SheetHolder.tsx
* Button.tsx
* Keypad.tsx
* CellComponent.tsx
* SheetComponent.tsx
* Formula.tsx
* Status.ts
* ServerSelector.tsx

The Model holds the core data and logic, the View displays the spreadsheet and its components, and the Controller manages the interactions between the Model and View.
The arrows indicate the flow of data and interactions among these components.
