import type { DocumentSection } from '../types/document';

interface GenerationContext {
  documentType: 'functional' | 'technical';
  currentSection: DocumentSection;
  allSections: DocumentSection[];
  instruction: string;
}

export class ContentGenerator {

  generateDetailedContent(context: GenerationContext): string {
    const { instruction, documentType, currentSection } = context;
    const lowerInstruction = instruction.toLowerCase();

    if (this.matchesKeywords(lowerInstruction, ['requirement', 'functionality', 'function', 'feature'])) {
      return this.generateFunctionalRequirements(currentSection, instruction);
    }

    if (this.matchesKeywords(lowerInstruction, ['data', 'table', 'field', 'database', 'structure'])) {
      return this.generateDataSpecifications(currentSection, instruction, documentType);
    }

    if (this.matchesKeywords(lowerInstruction, ['interface', 'integration', 'api', 'connection'])) {
      return this.generateInterfaceSpecifications(currentSection, instruction);
    }

    if (this.matchesKeywords(lowerInstruction, ['test', 'testing', 'scenario', 'validation'])) {
      return this.generateTestingContent(currentSection, instruction);
    }

    if (this.matchesKeywords(lowerInstruction, ['authorization', 'security', 'access', 'role', 'permission'])) {
      return this.generateAuthorizationContent(currentSection, instruction);
    }

    if (this.matchesKeywords(lowerInstruction, ['report', 'output', 'display', 'alv', 'layout'])) {
      return this.generateReportSpecifications(currentSection, instruction);
    }

    if (this.matchesKeywords(lowerInstruction, ['error', 'exception', 'handling', 'logging'])) {
      return this.generateErrorHandlingContent(currentSection, instruction);
    }

    if (this.matchesKeywords(lowerInstruction, ['performance', 'optimization', 'speed', 'efficiency'])) {
      return this.generatePerformanceContent(currentSection, instruction);
    }

    if (this.matchesKeywords(lowerInstruction, ['screen', 'ui', 'user interface', 'input', 'selection'])) {
      return this.generateUISpecifications(currentSection, instruction);
    }

    return this.generateGenericEnhancement(currentSection, instruction, documentType);
  }

  private matchesKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private generateFunctionalRequirements(section: DocumentSection, instruction: string): string {
    return `${section.content}

Enhanced Functional Requirements:

Business Process Flow:
1. User initiates the process by accessing transaction [T-CODE]
2. System validates user authorization for the requested operation
3. User enters required input parameters:
   • Plant (WERKS) - Mandatory field
   • Material Number (MATNR) - Optional, with F4 search help
   • Additional selection criteria as applicable
4. System performs data validation:
   • Checks mandatory fields are populated
   • Validates format and data types
   • Verifies authorization for selected organizational units
5. Upon successful validation, system executes the business logic:
   • Retrieves data from relevant SAP tables (MARA, MARC, MARD)
   • Applies business rules and calculations
   • Performs necessary updates or displays results
6. System provides confirmation or output to user
7. Transaction logged for audit trail purposes

Detailed Requirements Based on Instruction:
${instruction}

Key Functional Points:
• Input validation with clear error messaging
• Real-time authorization checks at field and transaction level
• Integration with standard SAP transactions where applicable
• Adherence to SAP best practices for user experience
• Support for multiple selection criteria with complex ranges

User Roles and Responsibilities:
• Business User: Execute standard operations with display and create authority
• Power User: Execute advanced functions including modification and reporting
• Administrator: Full access including configuration and authorization management

Data Validation Rules:
• All mandatory fields must be populated before processing
• Alphanumeric fields: Maximum length validation applied
• Numeric fields: Range and format validation (e.g., only positive numbers)
• Date fields: Valid date format and logical date range checks
• Authorization group validation for restricted materials`;
  }

  private generateDataSpecifications(section: DocumentSection, instruction: string, documentType: string): string {
    if (documentType === 'technical') {
      return `${section.content}

Detailed Data Model Specifications:

Primary Database Tables:

Table: Z[CUSTOM_TABLE_NAME]
Technical Name: Z[PREFIX]_[MODULE]_[PURPOSE]
Description: Custom table for storing [specific data purpose]
Delivery Class: Application table (master and transaction data)
Table Category: Transparent table

Field Structure:
┌─────────────┬──────────────┬──────┬────────┬─────┬────────────────────────┐
│ Field Name  │ Data Element │ Type │ Length │ Key │ Description           │
├─────────────┼──────────────┼──────┼────────┼─────┼────────────────────────┤
│ MANDT       │ MANDT        │ CLNT │ 3      │ X   │ Client                │
│ [KEY_FIELD] │ [DATA_ELEM]  │ CHAR │ 10     │ X   │ Primary key field     │
│ WERKS       │ WERKS_D      │ CHAR │ 4      │ X   │ Plant                 │
│ MATNR       │ MATNR        │ CHAR │ 18     │     │ Material number       │
│ DATUM       │ DATUM        │ DATS │ 8      │     │ Date field            │
│ MENGE       │ MENG13       │ QUAN │ 13     │     │ Quantity              │
│ MEINS       │ MEINS        │ UNIT │ 3      │     │ Unit of measure       │
│ WERT        │ WERT_V       │ CURR │ 15     │     │ Value                 │
│ WAERS       │ WAERS        │ CUKY │ 5      │     │ Currency              │
│ STATUS      │ Z_STATUS     │ CHAR │ 2      │     │ Status indicator      │
│ ERNAM       │ ERNAM        │ CHAR │ 12     │     │ Created by            │
│ ERDAT       │ ERDAT        │ DATS │ 8      │     │ Created on            │
│ AENAM       │ AENAM        │ CHAR │ 12     │     │ Changed by            │
│ AEDAT       │ AEDAT        │ DATS │ 8      │     │ Changed on            │
└─────────────┴──────────────┴──────┴────────┴─────┴────────────────────────┘

Primary Index:
• MANDT + [KEY_FIELD] + WERKS (Unique key)

Secondary Indexes:
Index 1: Non-unique index on MATNR + WERKS
• Purpose: Performance optimization for material-plant queries
• Estimated hit ratio: 80%

Index 2: Non-unique index on STATUS + ERDAT
• Purpose: Fast retrieval for status-based reporting
• Estimated hit ratio: 60%

Table Enhancements:
• Append structure Z[TABLE]_APP for customer fields (if extensibility required)
• Text table Z[TABLE]_T for language-dependent descriptions
• Log table Z[TABLE]_LOG for change history tracking

Foreign Key Relationships:
• WERKS → T001W-WERKS (Plants/Branches)
• MATNR → MARA-MATNR (Material Master)
• WAERS → TCURC-WAERS (Currencies)

Data Archiving Strategy:
• Archiving object: Z[ARCHIVING_OBJECT]
• Retention period: 7 years per compliance requirements
• Archive criteria: Records older than 2 years with completed status

Technical Constraints:
• Table buffering: Not allowed (frequently updated transactional data)
• Logging: Change documents via table logging (SE13)
• Authorization group: &NC& (default authorization)

Enhancement Based on Instruction:
${instruction}`;
    }

    // Functional data specifications
    return `${section.content}

Comprehensive Data Requirements:

Data Objects and Structures:

1. Master Data Requirements:

Material Master Data:
• Source Table: MARA (General Material Data)
• Key Fields: MATNR (Material Number)
• Required Fields:
  - Material number with leading zeros conversion
  - Material type (MTART) for categorization
  - Base unit of measure (MEINS)
  - Material group (MATKL)
  - Authorization group (BEGRU) for access control
• Validation: Material must exist and not be flagged for deletion
• Integration: Links to MARC (Plant Data), MARD (Storage Location Data)

Plant-Specific Material Data:
• Source Table: MARC (Plant Data for Material)
• Key Fields: MATNR + WERKS
• Required Fields:
  - MRP type (DISMM)
  - MRP controller (DISPO)
  - Procurement type (BESKZ)
  - Lot size (DISLS)
  - Availability check (MTVFP)

Storage Location Data:
• Source Table: MARD (Storage Location Data)
• Key Fields: MATNR + WERKS + LGORT
• Required Fields:
  - Unrestricted stock (LABST)
  - Quality inspection stock (INSME)
  - Blocked stock (SPEME)
  - Last goods receipt date (LDATE)

2. Transaction Data Requirements:

Document Headers:
• Document number (10 characters, numeric)
• Document type (2 characters, alphanumeric)
• Posting date (DATS format)
• Reference document number (16 characters)
• Header text (25 characters)
• Created by user ID (12 characters)
• Creation timestamp

Document Line Items:
• Line item number (4 digits, sequential)
• Material number (18 characters with leading zeros)
• Quantity (13 digits, 3 decimals)
• Unit of measure (3 characters)
• Plant (4 characters)
• Storage location (4 characters)
• Movement type (3 characters)
• Reason code (optional, 4 characters)

3. Data Validation Rules:

Input Validation:
• Mandatory fields: System prevents saving without required data
• Format validation: Alphanumeric patterns enforced (e.g., material number format)
• Range validation: Numeric fields within acceptable ranges (e.g., quantity > 0)
• Date validation: Posting date not in the future, not before open period
• Authorization validation: User authorized for plant, material group, transaction

Business Rule Validation:
• Stock availability: Sufficient unrestricted stock for issues
• Material status: Material not blocked or flagged for deletion
• Plant/storage location: Valid combinations exist in system
• Movement type: Appropriate for transaction type being executed
• Credit limits: Customer credit checks for sales documents (if applicable)

Referential Integrity:
• Material number exists in MARA
• Plant exists in T001W
• Storage location exists in T001L for given plant
• Vendor/customer exists in LFA1/KNA1 (if applicable)
• Currency code exists in TCURC

Data Sources for Reporting:
• Primary: MARD (storage location stock)
• Secondary: MBEW (material valuation)
• Supporting: MARA, MAKT (material master and descriptions)
• Organizational: T001W, T001L (plant and storage location data)

Instruction-Specific Enhancement:
${instruction}`;
  }

  private generateInterfaceSpecifications(section: DocumentSection, instruction: string): string {
    return `${section.content}

Comprehensive Interface Specifications:

Interface Overview:
Interface Name: [I/F_NAME]
Interface Type: [Inbound/Outbound]
Integration Method: [IDoc/RFC/Web Service/File]
Frequency: [Real-time/Hourly/Daily/On-demand]

Technical Architecture:

Communication Protocol:
• Protocol Type: RFC (Remote Function Call) / HTTP(S) / SFTP
• Message Format: XML / JSON / IDoc / Flat File
• Encoding: UTF-8
• Compression: GZIP (for large payloads)
• Encryption: TLS 1.2 or higher for sensitive data

Source System Details:
• System Name: [LEGACY_SYSTEM_NAME]
• System Type: [ERP/CRM/WMS/External Application]
• Network Address: [Hostname/IP Address]
• Communication Port: [Port Number]
• Authentication: [OAuth 2.0/Basic Auth/Certificate-based]
• Credentials: Stored in SM59 (RFC Destinations)

Target System Details:
• SAP System: [PRD/QAS/DEV]
• SAP Client: [Client Number]
• Target Module: MM/SD/FI/PP
• Receiving Function Module: [Z_FM_NAME or BAPI_NAME]
• Transaction Code: [Custom transaction if applicable]

Data Mapping Specifications:

Field-Level Mapping:
┌────────────────────┬────────────────────┬──────────────────────────────────┐
│ Source Field       │ Target Field (SAP) │ Transformation Rules             │
├────────────────────┼────────────────────┼──────────────────────────────────┤
│ MATERIAL_ID        │ MARA-MATNR         │ Pad with leading zeros to 18 char│
│ MATERIAL_DESC      │ MAKT-MAKTX         │ Truncate to 40 characters        │
│ PLANT_CODE         │ MARC-WERKS         │ Map using conversion table       │
│ QTY                │ QUANTITY           │ Convert to base UOM if needed    │
│ UOM                │ MEINS              │ Map ISO code to SAP UOM          │
│ PRICE              │ PRICE_VALUE        │ Convert currency if necessary    │
│ CURRENCY_CODE      │ WAERS              │ Map ISO to SAP currency code     │
│ STATUS_CODE        │ STATUS             │ Map external status to internal  │
│ EFFECTIVE_DATE     │ DATE_FIELD         │ Convert MM/DD/YYYY to YYYYMMDD   │
│ VENDOR_ID          │ LFA1-LIFNR         │ Pad with leading zeros to 10 char│
└────────────────────┴────────────────────┴──────────────────────────────────┘

Data Transformation Rules:

1. Material Number Transformation:
   • Remove special characters and spaces
   • Convert to uppercase
   • Apply leading zero conversion (CONVERSION_EXIT_ALPHA_INPUT)
   • Validate material exists in MARA before processing

2. Date/Time Transformation:
   • Source format: Various (MM/DD/YYYY, DD-MM-YYYY, Unix timestamp)
   • Target format: SAP internal (YYYYMMDD for DATS, HHMMSS for TIMS)
   • Timezone conversion: Convert to UTC or plant local time as appropriate
   • Validation: Reject future dates, dates before system go-live

3. Quantity and Unit Transformation:
   • Decimal separator: Convert comma to period (if applicable)
   • Unit of measure mapping: ISO codes → SAP internal codes (T006)
   • Quantity conversion: Apply conversion factors for alternative UOMs
   • Validation: Quantity > 0, UOM exists in SAP

4. Value and Currency Transformation:
   • Currency mapping: ISO 4217 codes → SAP currency keys (TCURC)
   • Exchange rate: Apply exchange rate if currency conversion needed (TCURR)
   • Decimal precision: 2 decimals for currency amounts
   • Validation: Valid currency code, amount within acceptable range

Error Handling Strategy:

Error Categories and Responses:

1. Data Validation Errors (Severity: Medium):
   • Invalid material number: Log error, send back to source with error message
   • Missing mandatory field: Reject record, notify source system
   • Invalid plant/storage location: Log error, place in error queue
   • Action: Place message in error queue (SXMB_MONI or custom error table)
   • Notification: Send error notification to integration support team
   • Retry: Manual correction and reprocessing required

2. System Errors (Severity: High):
   • Database connection failure: Retry 3 times with exponential backoff
   • SAP function module exception: Log exception details, alert technical team
   • Memory overflow: Reduce batch size, process in smaller chunks
   • Action: Log to application log (SLG1), create incident ticket
   • Notification: Immediate alert to on-call technical support
   • Retry: Automatic retry after system recovery

3. Business Logic Errors (Severity: Medium):
   • Insufficient stock for goods issue: Reject transaction, notify business user
   • Material blocked for plant: Return error message to source
   • Duplicate document number: Check for idempotency, reject if true duplicate
   • Action: Return business error message to source system
   • Notification: Business error report sent to business process owner
   • Retry: Source system must resolve business condition before retry

Error Logging:
• Error Log Table: Z_INTERFACE_ERROR_LOG
• Fields Logged:
  - Timestamp
  - Interface name
  - Message ID / Document number
  - Error category
  - Error message text
  - Source system
  - Payload (full message content for debugging)
  - Status (New/In Process/Resolved/Failed)
• Retention: 90 days for error logs

Monitoring and Alerting:

Interface Monitoring:
• Transaction: SXMB_MONI (PI/XI monitoring) or custom Z-transaction
• KPIs Tracked:
  - Total messages processed per day
  - Success rate (target: >99%)
  - Average processing time per message
  - Number of messages in error queue
  - Error rate by error category
• Dashboard: Custom dashboard for real-time monitoring

Alert Configuration:
• Alert 1: Error rate > 5% → Send email to integration support team
• Alert 2: Message processing time > 5 minutes → Investigate performance
• Alert 3: Interface failure (no messages received in expected time window) → Page on-call support
• Alert 4: Error queue size > 100 messages → Escalate to business and technical leads

Performance Considerations:
• Batch Size: Process messages in batches of 1000 records
• Parallel Processing: Enable parallel processing for high-volume interfaces
• Commit Strategy: Commit after each batch to avoid long-running locks
• Idempotency: Implement duplicate message detection to prevent reprocessing

Testing Requirements:
• Unit Testing: Test each transformation rule individually
• Integration Testing: End-to-end testing in QA environment
• Volume Testing: Process high volume (10,000+ records) to validate performance
• Error Testing: Simulate error scenarios to validate error handling
• Regression Testing: Validate existing functionality not impacted

Enhancement for Current Request:
${instruction}`;
  }

  private generateTestingContent(section: DocumentSection, instruction: string): string {
    return `${section.content}

Comprehensive Testing Strategy and Detailed Test Scenarios:

Testing Approach:

1. Testing Phases:
   • Phase 1: Unit Testing (Development team) - 1 week
   • Phase 2: Integration Testing (Functional + Technical team) - 1 week
   • Phase 3: System Integration Testing (Cross-module) - 3 days
   • Phase 4: User Acceptance Testing (Business users) - 2 weeks
   • Phase 5: Performance Testing (Technical team) - 3 days
   • Phase 6: Security Testing (Security team) - 2 days
   • Phase 7: Regression Testing (All teams) - 3 days

2. Testing Environments:
   • Development (DEV): Initial development and unit testing
   • Quality Assurance (QAS): Integration and system testing
   • Pre-Production (PRE-PROD): UAT and final validation
   • Production (PRD): Post-deployment smoke testing

Detailed Test Scenarios:

Test Scenario 1: Happy Path - Standard Process Flow
┌─────────────────────────────────────────────────────────────────────────┐
│ Test Case ID: TC001                                                     │
│ Priority: High                                                          │
│ Test Type: Functional                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ Objective:                                                              │
│ Validate complete end-to-end process flow with valid data              │
│                                                                         │
│ Prerequisites:                                                          │
│ • User has required authorization (SAP_MM_USER role)                   │
│ • Master data configured: Plant 1000, Material 10000000               │
│ • Sufficient unrestricted stock available                             │
│                                                                         │
│ Test Data:                                                             │
│ • Plant: 1000                                                          │
│ • Material: 10000000 (Finished Good)                                  │
│ • Quantity: 100 PC                                                     │
│ • Movement Type: 261 (Goods issue)                                    │
│ • Cost Center: CC1000                                                  │
│ • Order Number: 100001                                                 │
│                                                                         │
│ Test Steps:                                                            │
│ 1. Log in to SAP with test user ID: TEST_USER_001                    │
│ 2. Execute transaction [T-CODE]                                        │
│ 3. Enter plant 1000 in plant field                                    │
│ 4. Enter material 10000000 with F4 search help                        │
│ 5. Enter quantity 100 PC                                               │
│ 6. Select movement type 261 from dropdown                             │
│ 7. Enter cost center CC1000                                            │
│ 8. Enter order number 100001                                           │
│ 9. Click "Check" button to validate entries                           │
│ 10. Review any warning/informational messages                          │
│ 11. Click "Post" button to execute transaction                        │
│ 12. Capture material document number from confirmation screen         │
│ 13. Verify stock updated in MMBE transaction                          │
│                                                                         │
│ Expected Results:                                                       │
│ • All fields accept valid data without errors                         │
│ • Check button validates successfully (green light)                   │
│ • Material document created with sequential number                    │
│ • Confirmation message: "Material document 4900000001 posted"        │
│ • Stock reduced by 100 PC in MMBE for Plant 1000                     │
│ • Document line item visible in MB03 (Display Material Document)     │
│ • Accounting document created if applicable (FB03)                    │
│ • Audit trail entry created with user ID and timestamp               │
│                                                                         │
│ Actual Results: [To be filled during test execution]                  │
│ Status: [ ] Pass  [ ] Fail  [ ] Blocked                              │
│ Comments: ________________________________________________             │
│ Tester Name: _________________ Date: __________                       │
└─────────────────────────────────────────────────────────────────────────┘

Test Scenario 2: Negative Testing - Missing Mandatory Fields
┌─────────────────────────────────────────────────────────────────────────┐
│ Test Case ID: TC002                                                     │
│ Priority: High                                                          │
│ Test Type: Negative Testing                                            │
├─────────────────────────────────────────────────────────────────────────┤
│ Objective:                                                              │
│ Verify system properly handles missing mandatory fields                │
│                                                                         │
│ Test Steps:                                                            │
│ 1. Execute transaction without entering Plant field                   │
│ 2. Attempt to execute transaction without Material number             │
│ 3. Try to post without entering Quantity                               │
│ 4. Submit with blank Movement Type field                              │
│                                                                         │
│ Expected Results:                                                       │
│ • Error message: "Plant is a mandatory field" (M7 001)                │
│ • Error message: "Enter material number" (M3 305)                     │
│ • Error message: "Quantity must be greater than zero" (M7 045)       │
│ • Error message: "Movement type is required" (M7 012)                │
│ • System prevents posting until all mandatory fields populated        │
│ • Cursor positioned at first error field                              │
│ • Error messages displayed in red at bottom of screen                │
│                                                                         │
│ Actual Results: [To be filled during test execution]                  │
│ Status: [ ] Pass  [ ] Fail  [ ] Blocked                              │
└─────────────────────────────────────────────────────────────────────────┘

Test Scenario 3: Authorization Testing
┌─────────────────────────────────────────────────────────────────────────┐
│ Test Case ID: TC003                                                     │
│ Priority: Critical                                                      │
│ Test Type: Security/Authorization                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ Objective:                                                              │
│ Validate authorization checks prevent unauthorized access               │
│                                                                         │
│ Test Scenarios:                                                         │
│                                                                         │
│ 3A: User Without Display Authorization                                 │
│ • User ID: TEST_NO_AUTH                                                │
│ • Expected: Error message "No authorization for transaction [T-CODE]" │
│ • Expected: User cannot execute transaction                            │
│                                                                         │
│ 3B: User Authorized for Plant 1000 Only                               │
│ • User ID: TEST_PLANT_1000                                             │
│ • Test: Attempt to access Plant 2000 data                             │
│ • Expected: Error message "No authorization for Plant 2000"           │
│ • Expected: Data for Plant 1000 accessible normally                   │
│                                                                         │
│ 3C: User with Display Authorization Only (No Create/Change)           │
│ • User ID: TEST_DISPLAY_ONLY                                           │
│ • Test: Attempt to create/modify document                              │
│ • Expected: Error message "No authorization for activity Create"      │
│ • Expected: Display functions work normally                            │
│                                                                         │
│ Authorization Objects Tested:                                           │
│ • M_MSEG_BWA (Goods Movement: Warehouse Management)                   │
│ • M_MATE_WRK (Material Master: Plants)                                │
│ • M_MATE_MAR (Material Master Records)                                │
│                                                                         │
│ Status: [ ] Pass  [ ] Fail  [ ] Blocked                              │
└─────────────────────────────────────────────────────────────────────────┘

Test Scenario 4: Data Validation and Business Rules
┌─────────────────────────────────────────────────────────────────────────┐
│ Test Case ID: TC004                                                     │
│ Priority: High                                                          │
│ Test Type: Functional Validation                                       │
├─────────────────────────────────────────────────────────────────────────┤
│ Validation Tests:                                                       │
│                                                                         │
│ 4A: Insufficient Stock Validation                                      │
│ • Available Stock: 50 PC                                               │
│ • Requested Issue: 100 PC                                              │
│ • Expected: Error "Insufficient stock for goods issue"                │
│                                                                         │
│ 4B: Material Blocked for Plant                                         │
│ • Material Status: Blocked for procurement                            │
│ • Expected: Warning message "Material blocked for Plant 1000"        │
│ • Expected: Allow override with authorization                          │
│                                                                         │
│ 4C: Invalid Date Range                                                 │
│ • Posting Date: Date in closed fiscal period                          │
│ • Expected: Error "Period 001 2023 is not open"                       │
│ • Expected: Suggest open period dates                                 │
│                                                                         │
│ 4D: Numeric Field Validation                                           │
│ • Quantity: Negative value (-10)                                       │
│ • Expected: Error "Enter positive quantity"                            │
│                                                                         │
│ 4E: Material-Plant Combination                                         │
│ • Material: 10000000, Plant: 9999 (non-existent)                     │
│ • Expected: Error "Material 10000000 not maintained for Plant 9999"  │
│                                                                         │
│ Status: [ ] Pass  [ ] Fail  [ ] Blocked                              │
└─────────────────────────────────────────────────────────────────────────┘

Performance Testing Scenarios:

Test Scenario 5: Performance and Load Testing
┌─────────────────────────────────────────────────────────────────────────┐
│ Test Case ID: TC005                                                     │
│ Priority: Medium                                                        │
│ Test Type: Performance                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ Performance Benchmarks:                                                 │
│                                                                         │
│ 5A: Single Transaction Performance                                     │
│ • Test: Process single document                                        │
│ • Performance Target: < 2 seconds response time                       │
│ • Measure: Time from "Post" click to confirmation message             │
│ • Tool: SAP ST12 (Performance Trace) or stopwatch                     │
│                                                                         │
│ 5B: Batch Processing Performance                                       │
│ • Test: Process 1000 documents in background job                      │
│ • Performance Target: < 10 minutes total processing time              │
│ • Measure: Background job start to completion time (SM37)             │
│                                                                         │
│ 5C: Concurrent Users Load Test                                         │
│ • Test: 50 users executing transaction simultaneously                  │
│ • Performance Target: Average response time < 5 seconds               │
│ • Performance Target: No system timeouts or errors                    │
│ • Tool: SAP Load Testing Tool or manual coordination                  │
│                                                                         │
│ 5D: Database Performance                                                │
│ • Test: Execute report with large data volume (100,000 records)      │
│ • Performance Target: < 30 seconds execution time                     │
│ • Monitor: Database statistics (ST04), ABAP runtime (SE30)           │
│ • Optimization: Verify indexes used, no full table scans              │
│                                                                         │
│ Status: [ ] Pass  [ ] Fail  [ ] Blocked                              │
└─────────────────────────────────────────────────────────────────────────┘

Integration Testing Scenarios:

Test Scenario 6: Cross-Module Integration
┌─────────────────────────────────────────────────────────────────────────┐
│ Test Case ID: TC006                                                     │
│ Priority: High                                                          │
│ Test Type: Integration                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ Integration Points to Test:                                             │
│                                                                         │
│ 6A: MM-FI Integration (Material Movement to Accounting)               │
│ • Post goods movement in MM (MIGO, MB1A)                              │
│ • Verify accounting document created in FI (FB03)                     │
│ • Validate GL accounts debited/credited correctly                     │
│ • Check document link (MM doc → FI doc relationship)                  │
│                                                                         │
│ 6B: MM-PP Integration (Material Issue for Production Order)           │
│ • Create production order in PP (CO01)                                 │
│ • Issue material with reference to production order (261 mvt)        │
│ • Verify material consumption updated in production order (CO03)     │
│ • Check backflushing if configured                                     │
│                                                                         │
│ 6C: MM-SD Integration (Goods Issue for Sales Order)                   │
│ • Create sales order in SD (VA01)                                      │
│ • Perform delivery (VL01N) and post goods issue (VL02N)               │
│ • Verify sales order updated (delivered quantity)                     │
│ • Check billing document can be created (VF01)                        │
│                                                                         │
│ 6D: Interface Integration (Outbound to External System)               │
│ • Post transaction triggering outbound interface                       │
│ • Monitor interface (SXMB_MONI or custom monitor)                    │
│ • Verify message sent to target system successfully                   │
│ • Confirm data received and processed by target system               │
│                                                                         │
│ Status: [ ] Pass  [ ] Fail  [ ] Blocked                              │
└─────────────────────────────────────────────────────────────────────────┘

Acceptance Criteria:

UAT Sign-Off Criteria:
• All critical (Priority 1) test cases: 100% pass rate
• All high (Priority 2) test cases: 95% pass rate
• All medium (Priority 3) test cases: 90% pass rate
• Zero critical defects open at go-live
• All high-priority defects resolved or approved workarounds documented
• Performance benchmarks met for all scenarios
• Security/authorization testing 100% pass rate
• Integration testing with dependent modules successful
• User training completed and users comfortable with functionality
• Business process owner formal sign-off obtained

Test Execution Tracking:
• Test Case Repository: [HP ALM / JIRA / Excel]
• Defect Tracking: [JIRA / ServiceNow / SAP Solution Manager]
• Test Metrics Dashboard: Real-time status of test execution
• Daily Test Status Reports: Progress updates to project stakeholders

Instruction-Specific Testing Enhancement:
${instruction}

Test Exit Criteria:
• All planned test cases executed
• Pass rate meets acceptance criteria
• All critical and high defects resolved
• Performance targets achieved
• Business sign-off obtained
• Deployment readiness confirmed`;
  }

  private generateAuthorizationContent(section: DocumentSection, instruction: string): string {
    return `${section.content}

Comprehensive Security and Authorization Framework:

Authorization Concept Overview:

Security Model Architecture:
• Role-Based Access Control (RBAC): Users assigned to roles, roles contain authorization objects
• Segregation of Duties (SoD): Conflicting activities separated across roles to prevent fraud
• Least Privilege Principle: Users granted minimum access required for job functions
• Defense in Depth: Multiple layers of authorization checks (transaction, object, field level)

Authorization Objects and Implementation:

Primary Authorization Objects:

1. Transaction-Level Authorization:
┌──────────────────────────────────────────────────────────────────────┐
│ Authorization Object: S_TCODE                                        │
│ Description: Transaction Code Check at Program Start                │
│ Fields:                                                              │
│ • TCD (Transaction Code): [T-CODE]                                  │
│ Purpose: Controls access to execute specific transaction            │
│ Check Point: Transaction entry, program initialization              │
└──────────────────────────────────────────────────────────────────────┘

2. Material Master Authorization:
┌──────────────────────────────────────────────────────────────────────┐
│ Authorization Object: M_MATE_WRK                                     │
│ Description: Material Master Data by Plant                          │
│ Fields:                                                              │
│ • ACTVT (Activity): 01 (Create), 02 (Change), 03 (Display)        │
│ • WERKS (Plant): 1000, 2000, 3000, * (All)                        │
│ Purpose: Controls material master maintenance by plant              │
│ Implementation:                                                      │
│ AUTHORITY-CHECK OBJECT 'M_MATE_WRK'                                 │
│   ID 'ACTVT' FIELD '03'                                            │
│   ID 'WERKS' FIELD lv_werks.                                       │
│ IF sy-subrc <> 0.                                                   │
│   MESSAGE e001(zmsg) WITH 'No authorization for plant' lv_werks.   │
│ ENDIF.                                                              │
└──────────────────────────────────────────────────────────────────────┘

3. Inventory Management Authorization:
┌──────────────────────────────────────────────────────────────────────┐
│ Authorization Object: M_MSEG_BWA                                     │
│ Description: Goods Movements: Warehouse Management                  │
│ Fields:                                                              │
│ • ACTVT (Activity): 01 (Create/Post)                               │
│ • BWART (Movement Type): 101, 261, 501, * (All)                   │
│ • WERKS (Plant): Plant authorization                                │
│ Purpose: Controls posting of goods movements by movement type       │
│ Business Scenario:                                                   │
│ • Warehouse clerk: Authorized for 101 (GR), 261 (GI)              │
│ • Inventory manager: Authorized for all movement types (*)         │
└──────────────────────────────────────────────────────────────────────┘

4. Material Authorization Group:
┌──────────────────────────────────────────────────────────────────────┐
│ Authorization Object: M_MATE_MAR                                     │
│ Description: Material Master Records (General)                      │
│ Fields:                                                              │
│ • ACTVT (Activity): 03 (Display), 22 (Price Display)              │
│ • BEGRU (Authorization Group): High-value materials, confidential  │
│ Purpose: Restrict access to sensitive materials (e.g., precious    │
│          metals, pharmaceuticals, prototypes)                       │
│ Configuration: Material master field MARA-BEGRU                     │
└──────────────────────────────────────────────────────────────────────┘

5. Purchasing Authorization:
┌──────────────────────────────────────────────────────────────────────┐
│ Authorization Object: M_EINK_WRK                                     │
│ Description: Purchasing Info Records by Plant                       │
│ Fields:                                                              │
│ • ACTVT (Activity): 01 (Create), 02 (Change), 03 (Display)        │
│ • WERKS (Plant)                                                     │
│ • EKORG (Purchasing Organization)                                   │
│ Purpose: Control purchasing activities by organizational unit       │
└──────────────────────────────────────────────────────────────────────┘

Role Design and Assignment:

Standard SAP Roles (Reference):
• SAP_MM_IM_CLERK: Inventory clerk - display and basic postings
• SAP_MM_IM_MANAGER: Inventory manager - full inventory management
• SAP_MM_PUR_BUYER: Purchasing buyer - create POs, maintain info records
• SAP_MM_PUR_MANAGER: Purchasing manager - approve POs, strategic sourcing

Custom Roles (To Be Developed):

Role 1: Z_MM_INVENTORY_CLERK
├── Description: Warehouse clerk for goods movements
├── Authorization Profile: Z_MM_INV_CLERK_P
├── Transaction Codes:
│   ├── MIGO (Goods Movement)
│   ├── MB1A (Goods Issue)
│   ├── MB1B (Transfer Posting)
│   ├── MB1C (Other Goods Receipts)
│   ├── MMBE (Stock Overview) - Display only
│   └── [Custom T-Code] - As applicable
├── Authorization Objects:
│   ├── M_MSEG_BWA: ACTVT=01, BWART=101/261/311, WERKS=[assigned plants]
│   ├── M_MATE_WRK: ACTVT=03, WERKS=[assigned plants]
│   └── S_TCODE: TCD=[list of transaction codes]
├── Field-Level Authorizations:
│   ├── Can post goods movements
│   ├── Cannot reverse documents (requires manager approval)
│   └── Cannot post to blocked materials
└── Organizational Assignment:
    └── Plants: As per user's physical warehouse location

Role 2: Z_MM_INVENTORY_SUPERVISOR
├── Description: Inventory supervisor with approval authority
├── Authorization Profile: Z_MM_INV_SUPER_P
├── Transaction Codes:
│   ├── All clerk transactions
│   ├── MIGO with reversal capability (MBST)
│   ├── MI20 (Physical Inventory Count)
│   └── MI07 (Physical Inventory Recount)
├── Authorization Objects:
│   ├── M_MSEG_BWA: ACTVT=01, BWART=* (All movement types)
│   ├── M_MSEG_WMB: ACTVT=01/02/03
│   └── Additional: Reversal authorization
├── Special Authorizations:
│   ├── Post to blocked materials (with reason code)
│   ├── Reverse material documents
│   └── Adjust physical inventory differences
└── Organizational Assignment:
    └── Plants: Multiple plants within region

Role 3: Z_MM_MATERIALS_PLANNER
├── Description: Materials planner for MRP and procurement
├── Authorization Profile: Z_MM_MAT_PLAN_P
├── Transaction Codes:
│   ├── MD04 (Stock/Requirements List)
│   ├── MD02/MD02 (MRP Run - Single Item / Total)
│   ├── ME21N (Create Purchase Requisition)
│   ├── ME52N (Change Purchase Requisition)
│   └── MM03 (Display Material Master)
├── Authorization Objects:
│   ├── M_MATE_WRK: ACTVT=03, WERKS=*
│   ├── M_BANF_BST: ACTVT=01/02 (Create/Change PR)
│   └── M_MSEG_BWA: ACTVT=03 (Display only for inventory)
└── Access Restrictions:
    ├── Display-only access to inventory movements
    ├── Can create/change PRs but not POs
    └── Cannot post financial documents

Authorization Object Implementation in Code:

Sample ABAP Authorization Check:

* Check user authorization for plant
DATA: lv_plant TYPE werks_d VALUE '1000'.

AUTHORITY-CHECK OBJECT 'M_MATE_WRK'
  ID 'ACTVT' FIELD '03'    " Activity: Display
  ID 'WERKS' FIELD lv_plant. " Plant

IF sy-subrc <> 0.
  " No authorization - deny access
  MESSAGE e001(zmsg) WITH 'No authorization to display data for plant' lv_plant
    DISPLAY LIKE 'E'.
  LEAVE PROGRAM.
ENDIF.

* Check authorization for movement type
DATA: lv_bwart TYPE bwart VALUE '261'.

AUTHORITY-CHECK OBJECT 'M_MSEG_BWA'
  ID 'ACTVT' FIELD '01'    " Activity: Create
  ID 'BWART' FIELD lv_bwart " Movement Type
  ID 'WERKS' FIELD lv_plant. " Plant

IF sy-subrc <> 0.
  MESSAGE e002(zmsg) WITH 'No authorization for movement type' lv_bwart
    DISPLAY LIKE 'E'.
  LEAVE PROGRAM.
ENDIF.

* Additional check for material authorization group
DATA: lv_begru TYPE begru.

SELECT SINGLE begru INTO lv_begru
  FROM mara
  WHERE matnr = lv_matnr.

IF sy-subrc = 0 AND lv_begru IS NOT INITIAL.
  AUTHORITY-CHECK OBJECT 'M_MATE_MAR'
    ID 'ACTVT' FIELD '03'
    ID 'BEGRU' FIELD lv_begru.

  IF sy-subrc <> 0.
    MESSAGE e003(zmsg) WITH 'No authorization for material group' lv_begru
      DISPLAY LIKE 'E'.
    LEAVE PROGRAM.
  ENDIF.
ENDIF.


Segregation of Duties (SoD) Controls:

Critical SoD Conflicts to Prevent:

Conflict 1: Create Purchase Order + Approve Payment
• Risk: Procurement fraud - employee creates fictitious PO and approves payment
• Control: Separate roles for purchasing (M_EINK_FRG) and AP processing (F_BKPF_BUK)
• Monitoring: SUIM transaction to identify users with conflicting authorizations

Conflict 2: Post Goods Receipt + Vendor Invoice
• Risk: Collude with vendor to receive payment without goods delivery
• Control: Separate warehouse (MIGO) and invoice verification (MIRO) roles
• Monitoring: GRC Access Control tool or custom report

Conflict 3: Maintain Vendor Master + Create Purchase Order
• Risk: Create fictitious vendor and purchase order
• Control: Vendor master maintenance (FK01) separate from purchasing (ME21N)
• Exception: Small organizations may accept risk with compensating controls

Conflict 4: Material Master Maintenance + Physical Inventory
• Risk: Adjust master data to hide inventory discrepancies
• Control: Separate MM01/MM02 from MI01/MI04 activities
• Monitoring: Change documents (CDHDR/CDPOS) for material master changes

Field-Level Authorization (Future Enhancement):

Field Groups for Granular Control:
• Pricing Fields (MBEW-VERPR, MBEW-STPRS): Restricted to cost accounting users
• Vendor Fields (LFA1-NAME1, LFA1-BANKL): Restricted to AP and purchasing managers
• Critical Material Master Fields: Restricted by authorization group

Testing Authorization Configuration:

Authorization Test Cases:

Test 1: Positive Authorization Test
• User: Has required authorization
• Expected: Access granted, function executes successfully

Test 2: Negative Authorization Test - Transaction Level
• User: No S_TCODE authorization for transaction
• Expected: Error "You do not have authorization for transaction [T-CODE]"

Test 3: Negative Authorization Test - Object Level
• User: Has S_TCODE but lacks M_MATE_WRK for Plant 2000
• Expected: Error "No authorization for Plant 2000" when accessing data

Test 4: Authorization Trace Testing
• Tool: ST01 (Authorization Trace)
• Purpose: Identify missing authorization objects during testing
• Process: Run transaction with trace active, review failed authority checks

Ongoing Authorization Management:

User Access Reviews:
• Frequency: Quarterly for high-risk roles, annually for standard roles
• Process: Role owners review assigned users, remove inappropriate access
• Tool: SUIM (User Information System) transaction
• Documentation: Review results documented and approved by role owner

Role Changes and Enhancements:
• Process: Submit role change request via IT service desk
• Approval: Role owner and security team approval required
• Testing: Test role changes in DEV/QAS before production update
• Transport: Role transports via standard SAP transport mechanism (PFCG)

Authorization Audit Logging:
• Transaction: STAD (Statistical Records) for authorization failures
• Transaction: SM20/SM21 (Security Audit Log)
• Retention: Log data retained for 90 days minimum per compliance requirements

Enhancement Based on User Instruction:
${instruction}

Authorization Documentation:
• Authorization Matrix: Spreadsheet mapping roles to authorization objects
• Role Descriptions: Detailed documentation of each custom role
• SoD Matrix: Document of segregation of duties rules and conflicts
• User Assignment: List of users assigned to each role with approval dates`;
  }

  private generateReportSpecifications(section: DocumentSection, instruction: string): string {
    return `${section.content}

Comprehensive Report Specifications:

Report Overview and Business Purpose:

Report Name: [Z_REPORT_NAME]
Transaction Code: [Z_TCODE]
Module: MM/SD/FI/PP/[Module]
Report Type: [ALV Grid / Classical List / Interactive Report]
Execution Mode: [Online / Background]

Business Objective:
• Primary Purpose: [Detailed description of what business need this report addresses]
• Target Users: [Inventory planners, Financial analysts, Warehouse managers, etc.]
• Frequency of Use: [Daily/Weekly/Monthly/On-demand]
• Output Usage: [Decision-making, compliance reporting, operational monitoring, etc.]

Selection Screen Design:

Block 1: Primary Selection Criteria
─────────────────────────────────────
Parameter: S_WERKS (Plant)
• Field Type: SELECT-OPTIONS
• Data Element: WERKS_D
• Mandatory: Yes
• Multiple Selection: Yes (ranges, single values, exclusions)
• Default Value: None
• F4 Help: Standard search help from T001W (Plants/Branches)
• Input Validation: Plant must exist in T001W
• Authorization Check: User must have M_MATE_WRK authorization for plant

Parameter: S_MATNR (Material Number)
• Field Type: SELECT-OPTIONS
• Data Element: MATNR
• Mandatory: No
• Multiple Selection: Yes
• Default Value: Blank (all materials if not specified)
• F4 Help: Search help from MARA with material description
• Input Validation: Leading zeros conversion (CONVERSION_EXIT_ALPHA_INPUT)
• Material must exist in MARA table

Parameter: S_LGORT (Storage Location)
• Field Type: SELECT-OPTIONS
• Data Element: LGORT_D
• Mandatory: No
• Multiple Selection: Yes
• Default Value: Blank (all storage locations)
• F4 Help: Filtered by selected plants (dynamic help)
• Input Validation: Storage location must exist for selected plant (T001L)

Block 2: Date Selection
─────────────────────────
Parameter: P_STDAT (From Date)
• Field Type: PARAMETERS
• Data Element: DATUM
• Mandatory: Yes
• Default Value: First day of current month
• Validation: Date not in future, not before system go-live date

Parameter: P_ENDAT (To Date)
• Field Type: PARAMETERS
• Data Element: DATUM
• Mandatory: Yes
• Default Value: SY-DATUM (current date)
• Validation: To Date >= From Date

Block 3: Additional Filters (Optional)
────────────────────────────────────────
Parameter: S_MATKL (Material Group)
• Field Type: SELECT-OPTIONS
• F4 Help: Material group descriptions from T023

Parameter: P_ZERO (Include Zero Stock)
• Field Type: PARAMETERS (Checkbox)
• Default: Checked
• Purpose: Include/exclude materials with zero stock

Block 4: Output Options
────────────────────────
Parameter: P_VAR (ALV Layout Variant)
• Field Type: PARAMETERS
• Data Element: DISVARIANT-VARIANT
• Purpose: Load saved ALV layout variant

Parameter: P_BATCH (Background Processing Flag)
• Field Type: PARAMETERS (Checkbox)
• Purpose: Suppress popup dialogs for background execution

Report Output Layout - ALV Grid Columns:

Column Specifications:

Column 1: Material Number (MATNR)
• Technical Name: MATNR
• Data Type: CHAR(18)
• Header Text: Material
• Display Length: 18 characters
• Output Attributes:
  - Key column: Yes
  - Hotspot: Yes (double-click navigates to MM03)
  - Sorting: Primary sort ascending
  - Filtering: Enabled
  - Color: None (standard)

Column 2: Material Description (MAKTX)
• Technical Name: MAKTX
• Data Type: CHAR(40)
• Header Text: Material Description
• Data Source: MAKT-MAKTX (language-dependent)
• Display Length: 40 characters
• Output Attributes:
  - Tooltip: Full description on hover if truncated

Column 3: Plant (WERKS)
• Technical Name: WERKS
• Data Type: CHAR(4)
• Header Text: Plant
• Display: "XXXX - Plant Name" (combination of WERKS and NAME1 from T001W)
• Output Attributes:
  - Key column: Yes
  - Subtotal grouping: Yes

Column 4: Storage Location (LGORT)
• Technical Name: LGORT
• Data Type: CHAR(4)
• Header Text: Stor. Loc.
• Display: "XXXX - Description" (LGORT + LGOBE from T001L)

Column 5: Base Unit of Measure (MEINS)
• Technical Name: MEINS
• Data Type: UNIT(3)
• Header Text: UoM
• Display Format: Standard SAP unit of measure display

Column 6: Unrestricted Stock (LABST)
• Technical Name: LABST
• Data Type: QUAN(13.3)
• Header Text: Unrestricted
• Display Format:
  - Thousand separator: Yes (e.g., 1,234.567)
  - Decimal places: 3
  - Right-aligned
  - Unit reference: Column 5 (MEINS)
  - Subtotal: Yes (sum at plant level and grand total)
  - Color: Green if > 0, Gray if = 0

Column 7: Quality Inspection Stock (INSME)
• Similar format to Unrestricted Stock
• Color: Yellow/Orange to indicate inspection status

Column 8: Blocked Stock (SPEME)
• Similar format to Unrestricted Stock
• Color: Red if > 0 (indicates problem stock)

Column 9: Total Stock Quantity (TOTAL_QTY)
• Calculated: LABST + INSME + SPEME
• Display Format: Bold text, sum subtotals

Column 10: Standard/Moving Price (PRICE)
• Technical Name: PRICE
• Data Type: CURR(11.2)
• Header Text: Price/Unit
• Data Source: MBEW-STPRS or MBEW-VERPR depending on VPRSV
• Display Format:
  - Currency format with 2 decimals
  - Currency reference: Column 12
  - Right-aligned
  - Optional: Hide by default, show on user request

Column 11: Total Stock Value (TOTAL_VALUE)
• Calculated: TOTAL_QTY × PRICE
• Data Type: CURR(15.2)
• Header Text: Total Value
• Display Format:
  - Currency format
  - Subtotal: Yes
  - Bold text for totals
  - Currency reference: Column 12

Column 12: Currency (WAERS)
• Technical Name: WAERS
• Data Type: CUKY(5)
• Header Text: Curr
• Data Source: MBEW-WAERS

Column 13: Last Goods Receipt Date (LDATE)
• Technical Name: LDATE
• Data Type: DATS(8)
• Header Text: Last GR Date
• Display Format: DD.MM.YYYY (based on user settings)
• Color: Red if > 90 days (slow-moving indicator)

Column 14: Material Group (MATKL)
• Optional column, can be hidden by default

Column 15: ABC Indicator (Optional Enhancement)
• Calculated based on stock value
• Classification: A (top 80% value), B (next 15%), C (remaining 5%)

ALV Grid Features and Functionality:

Standard ALV Functions:
• Sort: Single-column and multi-column sorting
• Filter: Column-level filtering with wildcards
• Sum: Automatic sum calculation for quantity and value columns
• Subtotal: Subtotals at plant level and grand total
• Layout: Save/load custom layout variants
• Export: Excel, CSV, local file formats
• Print: Print to printer or PDF
• Find: Search function (Ctrl+F)
• Column reordering: Drag and drop columns

Interactive Features:
• Hotspot Navigation:
  - Double-click material number → MM03 (Display Material)
  - Double-click plant → Navigate to plant-level stock overview
• Traffic Light Icons:
  - Green: Adequate stock levels
  - Yellow: Reorder point reached
  - Red: Critical stock shortage
• Right-Click Context Menu:
  - View material document history (MB51)
  - Check current stock (MMBE)
  - View material master (MM03)
  - Additional custom functions

Subtotal and Total Logic:

Subtotal Rows:
• Level 1: Plant Subtotal
  - Label: "Total for Plant XXXX - [Plant Name]"
  - Position: After all storage locations for the plant
  - Aggregation: Sum of quantities and values
  - Format: Bold text, colored background (light gray)

• Level 2: Grand Total
  - Label: "Grand Total - All Plants"
  - Position: End of report
  - Aggregation: Sum across all plants
  - Format: Bold text, highlighted background (light blue)
  - Note: If mixed currencies, display warning "Mixed currencies - see subtotals"

Subtotal Display Example:

[Detail rows for Plant 1000]
────────────────────────────────────────────────────
Total for Plant 1000 - Plant US01     8,500.000   34,900.00 USD
────────────────────────────────────────────────────

[Detail rows for Plant 2000]
────────────────────────────────────────────────────
Total for Plant 2000 - Plant EU01     12,300.000  48,500.00 EUR
────────────────────────────────────────────────────

════════════════════════════════════════════════════
Grand Total - All Plants               20,800.000  [Mixed Curr]
════════════════════════════════════════════════════


Processing Logic:

Data Retrieval Strategy:

Step 1: Read Selection Screen Parameters
• Validate mandatory fields populated
• Perform authorization checks for selected plants
• Convert material numbers with leading zeros

Step 2: Primary Data Retrieval

SELECT matnr werks lgort labst insme speme ldate
  FROM mard
  INTO TABLE @DATA(lt_stock)
  WHERE matnr IN @s_matnr
    AND werks IN @s_werks
    AND lgort IN @s_lgort
    AND ( labst > 0 OR insme > 0 OR speme > 0 ).  "Exclude zero stock

* Check: If no data found, display message and exit
IF lt_stock IS INITIAL.
  MESSAGE i001(zmsg) WITH 'No stock data found for selected criteria'
    DISPLAY LIKE 'W'.
  LEAVE PROGRAM.
ENDIF.


Step 3: Enrich with Master Data
• Retrieve material descriptions (MAKT) for user language
• Retrieve plant names (T001W)
• Retrieve storage location descriptions (T001L)
• Retrieve material groups (MARA-MATKL)

Step 4: Retrieve Valuation Data
• Join with MBEW to get price and currency
• Calculate total stock value

Step 5: Apply Business Logic
• Calculate total stock quantity (LABST + INSME + SPEME)
• Calculate total stock value (Quantity × Price)
• Apply ABC classification if configured
• Identify slow-moving materials (last GR date > 90 days)

Step 6: Build Output Table
• Populate internal table for ALV display
• Apply sorting (material, plant, storage location)
• Configure field catalog for ALV

Step 7: Display ALV Grid

CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
  EXPORTING
    i_callback_program       = sy-repid
    i_callback_pf_status_set = 'PF_STATUS'
    i_callback_user_command  = 'USER_COMMAND'
    is_layout                = ls_layout
    it_fieldcat              = lt_fieldcat
    it_sort                  = lt_sort
    i_save                   = 'A'
    is_variant               = ls_variant
  TABLES
    t_outtab                 = lt_output
  EXCEPTIONS
    program_error            = 1
    OTHERS                   = 2.


Error Handling:

Error Scenarios and Handling:

1. No Authorization for Plant
   • Error Message: "No authorization to display stock for Plant [WERKS]"
   • Action: Filter output to show only authorized plants
   • Logging: Log authorization failure to SLG1

2. No Data Found
   • Information Message: "No stock data found for selected criteria"
   • Action: Display empty ALV grid with message
   • User Action: Modify selection criteria and re-execute

3. Database Read Error
   • Error Message: "Database error occurred. Contact support."
   • Action: Log error to application log (SLG1)
   • Technical Details: Log table name, error code, dump ID

4. ALV Display Error
   • Error Message: "Error displaying report. Try different layout."
   • Action: Fallback to default layout if custom layout fails

Enhancement for User Request:
${instruction}

Performance Optimization:

Database Optimization:
• Use indexes on MARD (primary key: MATNR + WERKS + LGORT)
• Avoid SELECT * - specify required fields only
• Use FOR ALL ENTRIES for related table lookups (with duplicate check)
• Implement parallel cursor for very large datasets

Runtime Optimization:
• Use field symbols and inline declarations (performance-optimized ABAP)
• Avoid nested loops - use READ TABLE with binary search
• Package data retrieval for batch processing (e.g., 10,000 records per package)

Background Processing Support:

Background Job Configuration:
• Job Name: Z_STOCK_REPORT_DAILY
• Job Class: C (Low priority, can run during business hours)
• Frequency: Daily at 6:00 AM
• Output: Spool list saved to SAP spool (SP01)
• Notification: Email notification on completion or error

Report Exit Criteria:
• Report executes successfully without dumps
• Data accuracy validated (matches MMBE)
• Performance meets SLA (< 30 seconds for typical selection)
• ALV functions work as expected
• Export to Excel successful
• Background job completes without errors`;
  }

  private generateErrorHandlingContent(section: DocumentSection, instruction: string): string {
    return `${section.content}

Comprehensive Error Handling and Exception Management Framework:

Error Handling Strategy:

Multi-Layered Error Handling Approach:
• Layer 1: Input Validation - Prevent errors at point of entry
• Layer 2: Business Logic Validation - Catch violations of business rules
• Layer 3: Technical Exception Handling - Handle system and database errors
• Layer 4: Integration Error Handling - Manage interface communication failures
• Layer 5: Logging and Monitoring - Track all errors for analysis and resolution

Error Classification:

Category 1: Validation Errors (User Correctable)
──────────────────────────────────────────────────
Severity: Low to Medium
Characteristics:
• Caused by invalid user input or missing data
• User can correct and retry immediately
• No system or data integrity impact
• Examples:
  - Missing mandatory field
  - Invalid date format
  - Material number not found
  - Insufficient authorization

Error Handling Approach:
• Display clear, actionable error message to user
• Highlight problem field (set cursor position)
• Provide suggested correction in message
• Allow user to correct and resubmit
• Log validation errors to audit trail (optional)

Example Error Messages:
• "Plant is a mandatory field. Please enter a valid plant."
• "Material 10000000 does not exist in Plant 1000. Check material-plant assignment."
• "Posting date 01.01.2020 is in closed period. Select date in open period."
• "Quantity must be greater than zero. Enter positive quantity."

Implementation (ABAP):

* Validate mandatory plant field
IF s_werks[] IS INITIAL.
  MESSAGE e001(zmsg) WITH 'Plant is mandatory. Please enter at least one plant.'
    DISPLAY LIKE 'E'.
  LEAVE PROGRAM.
ENDIF.

* Validate material exists
SELECT SINGLE matnr FROM mara INTO @DATA(lv_matnr)
  WHERE matnr = @lv_material.

IF sy-subrc <> 0.
  MESSAGE e002(zmsg) WITH 'Material' lv_material 'does not exist in system'
    DISPLAY LIKE 'E'.
  LEAVE PROGRAM.
ENDIF.


Category 2: Business Rule Violations
──────────────────────────────────────
Severity: Medium
Characteristics:
• Transaction violates business rules or policies
• Data is valid but business logic prevents processing
• May require management override or approval
• Examples:
  - Insufficient stock for goods issue
  - Purchase order exceeds approval limit
  - Material blocked for plant
  - Credit limit exceeded for customer

Error Handling Approach:
• Display warning or error message explaining business rule
• Provide option to request override/approval (if applicable)
• Log business rule violation to audit trail
• Route to approval workflow if configured
• Prevent transaction completion until resolved

Example Error Messages:
• "Insufficient stock. Available: 50 PC, Requested: 100 PC. Reduce quantity or check other storage locations."
• "Material 10000000 is blocked for Plant 1000. Contact materials management for unblock."
• "Purchase order value $150,000 exceeds approval limit $100,000. Route to manager for approval."
• "Customer credit limit exceeded. Outstanding: $500,000, Limit: $400,000. Request credit review."

Implementation (ABAP):

* Check sufficient stock
SELECT SINGLE labst FROM mard INTO @DATA(lv_stock)
  WHERE matnr = @lv_material
    AND werks = @lv_plant
    AND lgort = @lv_sloc.

IF lv_stock < lv_requested_qty.
  MESSAGE e003(zmsg) WITH 'Insufficient stock. Available:' lv_stock
                          'Requested:' lv_requested_qty
    DISPLAY LIKE 'E'.
  LEAVE PROGRAM.
ENDIF.

* Check material not blocked
SELECT SINGLE lvorm FROM marc INTO @DATA(lv_blocked)
  WHERE matnr = @lv_material
    AND werks = @lv_plant.

IF lv_blocked = 'X'.
  MESSAGE w004(zmsg) WITH 'Material' lv_material 'blocked for Plant' lv_plant
    DISPLAY LIKE 'W'.
  * Optionally: Allow override with special authorization
ENDIF.


Category 3: System and Technical Errors
────────────────────────────────────────
Severity: High to Critical
Characteristics:
• System-level failures (database, memory, network)
• User cannot resolve - requires technical intervention
• May impact data integrity or system availability
• Examples:
  - Database connection failure
  - Memory overflow
  - Deadlock or lock timeout
  - Short dump (ABAP runtime error)

Error Handling Approach:
• Catch exception in TRY-CATCH block
• Display user-friendly error message (hide technical details)
• Log full technical details to application log (SLG1)
• Rollback transaction to prevent partial updates
• Alert technical support team via email/ticket
• Provide error reference number to user for support ticket

Example Error Messages (User-Facing):
• "System error occurred. Transaction ID: 1234567. Please contact support."
• "Database temporarily unavailable. Please try again in a few minutes."
• "Unexpected error. Your changes have not been saved. Reference: ERR_20240115_001"

Technical Logging (Behind the Scenes):
• Full exception details logged
• Stack trace captured
• User ID, transaction, timestamp recorded
• Input parameters and data context saved
• System status and resource usage captured

Implementation (ABAP):

TRY.
  * Main processing logic
  PERFORM process_business_transaction.

CATCH cx_sy_sql_error INTO DATA(lx_sql_error).
  * Database error
  DATA(lv_error_msg) = lx_sql_error->get_text( ).
  DATA(lv_error_id) = generate_error_id( ).

  * Log to application log
  CALL FUNCTION 'BAL_LOG_MSG_ADD'
    EXPORTING
      i_log_handle     = gv_log_handle
      i_s_msg          = VALUE #(
        msgty = 'E'
        msgid = 'ZMSG'
        msgno = '100'
        msgv1 = 'Database error'
        msgv2 = lv_error_id
      ).

  * Display user-friendly message
  MESSAGE e100(zmsg) WITH 'System error. Reference:' lv_error_id
    DISPLAY LIKE 'E'.

  * Send alert to support
  PERFORM send_alert_to_support USING lv_error_id lv_error_msg.

  * Rollback changes
  ROLLBACK WORK.

CATCH cx_sy_zerodivide INTO DATA(lx_zero_divide).
  * Calculation error
  MESSAGE e101(zmsg) WITH 'Calculation error. Division by zero.'
    DISPLAY LIKE 'E'.

CATCH cx_root INTO DATA(lx_general).
  * Catch-all for unexpected exceptions
  DATA(lv_exception_text) = lx_general->get_text( ).
  MESSAGE e999(zmsg) WITH 'Unexpected error:' lv_exception_text
    DISPLAY LIKE 'E'.

ENDTRY.


Category 4: Interface and Integration Errors
──────────────────────────────────────────────
Severity: Medium to High
Characteristics:
• Communication failure with external systems
• Data mapping or transformation errors
• Protocol or connectivity issues
• Examples:
  - RFC destination not reachable
  - Web service timeout
  - Invalid XML/JSON payload
  - Authentication failure

Error Handling Approach:
• Implement retry logic with exponential backoff
• Queue failed messages for later reprocessing
• Send notification to integration support team
• Log error details for troubleshooting
• Provide status visibility to business users

Implementation:

* Call RFC with error handling
DATA: lv_retry_count TYPE i VALUE 0.
DATA: lv_max_retries TYPE i VALUE 3.
DATA: lv_success TYPE abap_bool VALUE abap_false.

WHILE lv_retry_count < lv_max_retries AND lv_success = abap_false.
  TRY.
    CALL FUNCTION 'Z_RFC_FUNCTION_MODULE'
      DESTINATION 'REMOTE_SYSTEM'
      EXPORTING
        iv_input  = lv_input_data
      IMPORTING
        ev_output = lv_output_data
      EXCEPTIONS
        system_failure        = 1
        communication_failure = 2
        OTHERS                = 3.

    IF sy-subrc = 0.
      lv_success = abap_true.
    ELSE.
      lv_retry_count = lv_retry_count + 1.
      IF lv_retry_count < lv_max_retries.
        * Wait before retry (exponential backoff)
        DATA(lv_wait_time) = lv_retry_count * 2.  "2, 4, 6 seconds
        WAIT UP TO lv_wait_time SECONDS.
      ENDIF.
    ENDIF.

  CATCH cx_root INTO DATA(lx_rfc_error).
    * Log RFC error
    PERFORM log_interface_error USING lx_rfc_error->get_text( ).
    lv_retry_count = lv_retry_count + 1.
  ENDTRY.
ENDWHILE.

IF lv_success = abap_false.
  * All retries failed - place in error queue
  PERFORM add_to_error_queue USING lv_input_data.
  MESSAGE e200(zmsg) WITH 'Interface call failed. Message queued for retry.'
    DISPLAY LIKE 'E'.
ENDIF.


Logging Framework:

Application Log (SLG1):

Log Object: Z_MM_APPLICATION
Subobjects:
• Z_MM_GOODS_MOVEMENT
• Z_MM_INVENTORY_RECOUNT
• Z_MM_MATERIAL_MASTER
• Z_MM_INTERFACE_ERROR

Log Structure:
┌────────────────┬────────────────────────────────────────────────────────┐
│ Field          │ Description                                            │
├────────────────┼────────────────────────────────────────────────────────┤
│ Log Handle     │ Unique identifier for log session                      │
│ Object         │ Application area (Z_MM_APPLICATION)                    │
│ Subobject      │ Specific functional area                               │
│ External ID    │ Document number or transaction ID for reference        │
│ Message Type   │ E (Error), W (Warning), I (Info), S (Success)         │
│ Message Class  │ ZMSG (custom message class)                            │
│ Message Number │ Message number within class                            │
│ Message Vars   │ Variables for parameterized message text              │
│ Timestamp      │ Date and time of log entry                            │
│ User           │ User ID who triggered the error                        │
│ Transaction    │ Transaction code being executed                        │
│ Program        │ ABAP program name                                      │
│ Context Info   │ Additional context data (JSON or structured)          │
└────────────────┴────────────────────────────────────────────────────────┘

Log Creation Example:

* Create new application log
DATA: lv_log_handle TYPE balloghndl.

CALL FUNCTION 'BAL_LOG_CREATE'
  EXPORTING
    i_s_log      = VALUE bal_s_log(
      object     = 'Z_MM_APPLICATION'
      subobject  = 'Z_MM_GOODS_MOVEMENT'
      extnumber  = lv_document_number
      aldate     = sy-datum
      altime     = sy-uzeit
      aluser     = sy-uname
      alprog     = sy-repid
    )
  IMPORTING
    e_log_handle = lv_log_handle.

* Add error message to log
CALL FUNCTION 'BAL_LOG_MSG_ADD'
  EXPORTING
    i_log_handle = lv_log_handle
    i_s_msg      = VALUE bal_s_msg(
      msgty = 'E'        "Error
      msgid = 'ZMSG'     "Message class
      msgno = '001'      "Message number
      msgv1 = 'Parameter 1'
      msgv2 = 'Parameter 2'
    ).

* Save log to database
CALL FUNCTION 'BAL_DB_SAVE'
  EXPORTING
    i_client     = sy-mandt
    i_t_log_handle = VALUE bal_t_logh( ( lv_log_handle ) ).


Error Message Class:

Message Class: ZMSG
Message Maintenance: SE91

Sample Messages:
┌────────┬──────┬──────────────────────────────────────────────────────┐
│ Number │ Type │ Message Text                                         │
├────────┼──────┼──────────────────────────────────────────────────────┤
│ 001    │ E    │ & is a mandatory field. Please enter a valid &.      │
│ 002    │ E    │ Material & does not exist in Plant &.                │
│ 003    │ E    │ Insufficient stock. Available: &, Requested: &.      │
│ 004    │ W    │ Material & is blocked for Plant &. Override? (Y/N)   │
│ 100    │ E    │ System error occurred. Reference: &. Contact support.│
│ 200    │ E    │ Interface call failed after & retries. Queued.       │
│ 999    │ E    │ Unexpected error: &. Transaction ID: &.              │
└────────┴──────┴──────────────────────────────────────────────────────┘

Custom Error Queue Table:

Table: Z_ERROR_QUEUE
Purpose: Store failed transactions for manual reprocessing

Structure:
┌──────────────┬──────────────┬──────┬────────┬────────────────────────┐
│ Field        │ Data Element │ Type │ Length │ Description            │
├──────────────┼──────────────┼──────┼────────┼────────────────────────┤
│ MANDT        │ MANDT        │ CLNT │ 3      │ Client                 │
│ ERROR_ID     │ ZERRRID      │ CHAR │ 20     │ Unique error ID (key)  │
│ CREATED_AT   │ TIMESTAMPL   │ DEC  │ 21     │ Timestamp              │
│ ERROR_TYPE   │ ZERRTYPE     │ CHAR │ 10     │ Error category         │
│ PROGRAM      │ PROGRAMM     │ CHAR │ 40     │ Program name           │
│ TRANSACTION  │ TCODE        │ CHAR │ 20     │ Transaction code       │
│ USER_ID      │ UNAME        │ CHAR │ 12     │ User who encountered   │
│ ERROR_MSG    │ BAPI_MSG     │ CHAR │ 220    │ Error message text     │
│ PAYLOAD      │ ZERRPLD      │ STRG │        │ Full input data (JSON) │
│ STATUS       │ ZERRSTATUS   │ CHAR │ 1      │ N/P/R/F (New/Process/  │
│              │              │      │        │  Resolved/Failed)      │
│ RETRY_COUNT  │ ZRETRYCNT    │ INT4 │ 10     │ Number of retries      │
│ RESOLVED_AT  │ TIMESTAMPL   │ DEC  │ 21     │ Resolution timestamp   │
│ RESOLVED_BY  │ UNAME        │ CHAR │ 12     │ Resolver user ID       │
└──────────────┴──────────────┴──────┴────────┴────────────────────────┘

Monitoring and Alerting:

Alert Configuration:

Alert 1: Critical Error Threshold Exceeded
• Trigger: > 10 errors in 5-minute window
• Action: Send email to support team
• Recipients: sap-support@company.com
• Priority: High
• Email Subject: "CRITICAL: High error rate in [Program/Transaction]"

Alert 2: System Exception Detected
• Trigger: Any short dump (ST22) related to custom programs
• Action: Create incident ticket automatically
• Notification: SMS/page to on-call developer
• Priority: Critical

Alert 3: Interface Failure
• Trigger: Interface error queue size > 100 messages
• Action: Email to integration team and business process owner
• Priority: Medium to High (depending on interface criticality)

Error Dashboard:

KPIs Displayed:
• Total errors in last 24 hours (by category)
• Error rate trend (hourly/daily)
• Top 5 error messages by frequency
• Average time to resolution
• Unresolved errors by age
• Error queue size by interface

Dashboard Access: Custom transaction or SAP Fiori tile

Enhancement Based on Instruction:
${instruction}

Error Recovery Procedures:

Recovery Process for Common Errors:

1. Database Lock Timeout:
   - Wait 30 seconds and retry
   - If persistent, identify locking transaction (SM12)
   - Contact locking user to release or escalate

2. Insufficient Stock:
   - Check other storage locations for available stock (MMBE)
   - Suggest transfer posting from other location
   - Reduce requested quantity or split order

3. Interface Communication Failure:
   - Verify network connectivity (ping remote system)
   - Check RFC destination configuration (SM59)
   - Test RFC connection (Connection Test in SM59)
   - Reprocess from error queue after recovery

4. Authorization Failure:
   - Run authorization trace (ST01) to identify missing object
   - Request authorization from security team
   - Temporary workaround: Route to authorized user

Best Practices:

Error Handling Best Practices:
• Always use TRY-CATCH for potentially failing operations
• Provide context in error messages (what, where, when, why, how to fix)
• Log sufficient detail for troubleshooting without exposing sensitive data
• Implement graceful degradation (partial failure doesn't crash entire process)
• Design for idempotency (safe to retry without duplicate side effects)
• Document error codes and recovery procedures
• Regular error log review to identify recurring issues
• Proactive monitoring and alerting for critical errors`;
  }

  private generatePerformanceContent(section: DocumentSection, instruction: string): string {
    return `${section.content}

Comprehensive Performance Optimization Strategy:

Performance Requirements and SLAs:

Service Level Agreements (SLAs):
┌────────────────────────────┬──────────────────┬────────────────────────┐
│ Operation Type             │ Target Time      │ Maximum Acceptable     │
├────────────────────────────┼──────────────────┼────────────────────────┤
│ Simple Transaction (Display)│ < 2 seconds      │ 5 seconds              │
│ Data Entry Transaction     │ < 3 seconds      │ 8 seconds              │
│ Report Execution (Online)  │ < 10 seconds     │ 30 seconds             │
│ Batch Job Processing       │ Based on volume  │ Complete within window │
│ Interface Message Process  │ < 5 seconds/msg  │ 15 seconds/message     │
│ Database Query (Simple)    │ < 100ms          │ 500ms                  │
│ Database Query (Complex)   │ < 1 second       │ 3 seconds              │
└────────────────────────────┴──────────────────┴────────────────────────┘

Performance Targets by Data Volume:
• Small: < 1,000 records → 2 seconds
• Medium: 1,000 - 10,000 records → 10 seconds
• Large: 10,000 - 100,000 records → 30 seconds
• Very Large: > 100,000 records → Batch processing recommended

Database Performance Optimization:

1. Index Strategy:

Primary Indexes (Automatically Created):
• Created on primary key fields
• Always used when full key specified in WHERE clause
• Example: MARD (MANDT + MATNR + WERKS + LGORT)

Secondary Indexes (Custom):
• Create for frequently used non-key field combinations
• Balance: Improve read performance vs. slower writes
• Maintenance: Review quarterly, drop unused indexes

Index Creation Example:

-- Secondary index on MARD for material-plant queries
CREATE INDEX ZMARD~001 ON MARD (
  MANDT,
  MATNR,
  WERKS
) MONITORING USAGE;

-- Secondary index for date range queries
CREATE INDEX ZMARD~002 ON MARD (
  MANDT,
  WERKS,
  LGORT,
  ERDAT
) MONITORING USAGE;


Index Usage Validation:
• Transaction: DB05 (Table Analysis)
• Check: ST04 (Database Performance Monitor)
• Verify: SQL trace (ST05) confirms index usage
• Review: SAP Note recommendations for standard tables

2. Query Optimization:

Optimal SELECT Statements:

✓ GOOD - Specific field list, indexed WHERE clause:

SELECT matnr werks lgort labst
  FROM mard
  INTO TABLE @DATA(lt_stock)
  WHERE matnr IN @s_matnr
    AND werks IN @s_werks
  UP TO 10000 ROWS.


✗ BAD - SELECT *, no WHERE clause:

SELECT * FROM mard INTO TABLE lt_stock.  "Avoid!


✓ GOOD - SELECT SINGLE when retrieving one record:

SELECT SINGLE labst FROM mard INTO @DATA(lv_stock)
  WHERE matnr = @lv_material
    AND werks = @lv_plant
    AND lgort = @lv_sloc.


✗ BAD - SELECT without SINGLE for unique record:

SELECT labst FROM mard INTO lv_stock
  WHERE matnr = lv_material. "Retrieves multiple, keeps last
ENDSELECT.


✓ GOOD - Use aggregate functions in database:

SELECT werks SUM( labst ) AS total_stock
  FROM mard
  INTO TABLE @DATA(lt_totals)
  WHERE werks IN @s_werks
  GROUP BY werks.


✗ BAD - Aggregate in ABAP loop:

SELECT * FROM mard INTO TABLE lt_mard.
LOOP AT lt_mard...
  "Calculate totals in loop - inefficient!
ENDLOOP.


3. FOR ALL ENTRIES Optimization:

Proper Usage:

* Check internal table not empty (crucial!)
IF lt_materials IS NOT INITIAL.

  * Remove duplicates for performance
  SORT lt_materials BY matnr.
  DELETE ADJACENT DUPLICATES FROM lt_materials COMPARING matnr.

  * Limit size to prevent query explosion
  IF lines( lt_materials ) > 10000.
    "Process in chunks or use different approach
  ENDIF.

  SELECT matnr maktx
    FROM makt
    INTO TABLE @DATA(lt_descriptions)
    FOR ALL ENTRIES IN @lt_materials
    WHERE matnr = @lt_materials-matnr
      AND spras = @sy-langu.
ENDIF.


Common Pitfalls to Avoid:
✗ Empty internal table check missing → returns all records!
✗ Too many entries (> 10,000) → performance degrades
✗ Duplicate entries → redundant database queries
✗ Complex ON conditions → query optimization difficult

4. Join Operations:

Database Join (Preferred for small result sets):

SELECT m~matnr m~labst t~maktx
  FROM mard AS m
  INNER JOIN makt AS t
    ON t~matnr = m~matnr
   AND t~spras = @sy-langu
  INTO TABLE @DATA(lt_result)
  WHERE m~werks IN @s_werks.


FOR ALL ENTRIES (Preferred for large result sets):

* Better for selective filtering or large datasets
SELECT matnr werks labst FROM mard INTO TABLE lt_stock
  WHERE werks IN s_werks.

IF lt_stock IS NOT INITIAL.
  SELECT matnr maktx FROM makt INTO TABLE lt_text
    FOR ALL ENTRIES IN lt_stock
    WHERE matnr = lt_stock-matnr
      AND spras = sy-langu.
ENDIF.


5. Table Buffering:

Buffering Strategy:
• Single-record buffering: For master data tables (T001W, T001L)
• Generic buffering: For small configuration tables
• Full buffering: For very small, frequently read tables

Check Buffering Status:
• Transaction: SE11 (Table maintenance)
• Menu: Technical Settings → Buffering

Buffer Bypass (When Current Data Required):

SELECT SINGLE werks name1 FROM t001w
  INTO @DATA(ls_plant)
  WHERE werks = @lv_plant
  BYPASSING BUFFER.  "Get latest data, ignore buffer


ABAP Code Optimization:

1. Use Modern ABAP Syntax:

✓ Inline Declarations (7.40+):

DATA(lv_material) = '000000000010000000'.
DATA(lt_stock) = VALUE tt_stock( ).


✓ Constructor Expressions:

lt_output = VALUE #(
  ( matnr = '10000000' werks = '1000' labst = 100 )
  ( matnr = '10000001' werks = '1000' labst = 200 )
).


✓ Table Expressions (Avoid READ TABLE):

TRY.
  DATA(ls_stock) = lt_stock[ matnr = lv_material ].
CATCH cx_sy_itab_line_not_found.
  "Handle not found
ENDTRY.


2. Loop Optimization:

✓ GOOD - Use LOOP with WHERE:

LOOP AT lt_stock INTO DATA(ls_stock) WHERE werks = '1000'.
  "Process
ENDLOOP.


✗ BAD - Check inside loop:

LOOP AT lt_stock INTO ls_stock.
  IF ls_stock-werks = '1000'.
    "Process
  ENDIF.
ENDLOOP.


✓ GOOD - LOOP with TRANSPORTING NO FIELDS (just counting):

DATA(lv_count) = 0.
LOOP AT lt_stock TRANSPORTING NO FIELDS WHERE werks = '1000'.
  lv_count = lv_count + 1.
ENDLOOP.
* Better: Use REDUCE or lines( ... )
DATA(lv_count) = lines( FILTER #( lt_stock WHERE werks = '1000' ) ).


3. Field Symbols and References:

✓ Use Field Symbols for Large Structures:

LOOP AT lt_large_table ASSIGNING FIELD-SYMBOL(<fs_row>).
  <fs_row>-field = 'Updated'.  "Direct modification, no copy
ENDLOOP.


✗ Work Variables (Less Efficient):

LOOP AT lt_large_table INTO DATA(ls_row).
  ls_row-field = 'Updated'.
  MODIFY lt_large_table FROM ls_row.  "Copy overhead
ENDLOOP.


4. Parallel Processing:

Background Job with Parallel RFC:

* Split data into packages
DATA(lv_package_size) = 1000.
DATA(lv_packages) = lines( lt_data ) DIV lv_package_size + 1.

DO lv_packages TIMES.
  DATA(lv_offset) = ( sy-index - 1 ) * lv_package_size.

  " Call processing function in parallel
  CALL FUNCTION 'Z_PROCESS_PACKAGE'
    STARTING NEW TASK sy-index
    DESTINATION IN GROUP 'parallel_generators'
    EXPORTING
      it_package = lt_data
      iv_offset  = lv_offset
      iv_package_size = lv_package_size
    EXCEPTIONS
      communication_failure = 1
      system_failure        = 2.
ENDDO.

* Wait for all tasks to complete
WAIT UNTIL <all_tasks_done> UP TO 600.


5. Memory Management:

✓ GOOD - Free Memory After Use:

DATA: lt_large_table TYPE STANDARD TABLE OF ...

" Use the table
SELECT * FROM huge_table INTO TABLE lt_large_table.
LOOP AT lt_large_table...
ENDLOOP.

" Free memory when done
CLEAR lt_large_table.
FREE lt_large_table.


✓ Reference Data Instead of Copying:

DATA(lr_data) = REF #( lt_large_table ).
" Work with lr_data->* instead of copying entire table


Performance Monitoring Tools:

1. Runtime Analysis (SE30/SAT):

Usage:
• Execute transaction SE30 or SAT
• Select program/transaction to analyze
• Run with representative data volume
• Review results:
  - Total runtime
  - Database time
  - ABAP processing time
  - Most expensive operations

Key Metrics:
• Database Time: Should be < 50% of total runtime
• ABAP Processing: Optimize if > 50%
• Number of Database Accesses: Minimize
• Identical Selects: Indicates potential buffering opportunity

2. SQL Trace (ST05):

Activate Trace:
• Transaction ST05
• Activate SQL Trace for user
• Execute transaction/report
• Deactivate trace
• Display trace results

Analyze:
• Identify sequential reads (SELECT in loop) → Convert to bulk read
• Check for full table scans → Add index
• Review expensive queries → Optimize WHERE clause
• Verify index usage → Check EXPLAIN PLAN

3. Database Performance (ST04):

Monitor:
• Database response time
• Buffer hit ratios (> 95% good)
• Expensive SQL statements
• Table growth trends

4. ABAP Code Inspector (SCI/ATC):

Checks:
• Performance anti-patterns
• Obsolete statements
• Best practice violations
• Security issues

Run:
• Transaction SCI or ATC
• Select variant (performance checks)
• Analyze findings and remediate

Batch Processing Optimization:

Background Job Best Practices:

1. Package Processing:

* Process in chunks to avoid memory issues
DATA: lv_package_size TYPE i VALUE 1000.
DATA: lv_processed TYPE i VALUE 0.

SELECT matnr werks lgort labst
  FROM mard
  INTO TABLE @DATA(lt_package)
  WHERE werks IN @s_werks
  PACKAGE SIZE @lv_package_size.

  " Process package
  PERFORM process_package USING lt_package.

  " Commit work after each package
  COMMIT WORK.

  lv_processed = lv_processed + lines( lt_package ).

  " Progress indicator for background job
  CALL FUNCTION 'SAPGUI_PROGRESS_INDICATOR'
    EXPORTING
      percentage = ( lv_processed * 100 ) / lv_total
      text       = |Processing: { lv_processed } of { lv_total }|.

ENDSELECT.


2. Background Job Scheduling:
• Schedule during low-usage hours (nights, weekends)
• Use job classes appropriately (A=Critical, B=Medium, C=Low)
• Monitor job runtime trends (SM37)
• Set appropriate timeout values

3. Commit Work Strategy:

* Commit after logical units of work
DATA: lv_commit_counter TYPE i VALUE 0.
CONSTANTS: lc_commit_frequency TYPE i VALUE 100.

LOOP AT lt_documents INTO DATA(ls_doc).
  PERFORM post_document USING ls_doc.

  lv_commit_counter = lv_commit_counter + 1.
  IF lv_commit_counter >= lc_commit_frequency.
    COMMIT WORK.
    lv_commit_counter = 0.
  ENDIF.
ENDLOOP.

* Final commit for remaining records
IF lv_commit_counter > 0.
  COMMIT WORK.
ENDIF.


Performance Testing:

Load Testing Scenarios:

Test 1: Single User Performance
• Execute transaction with typical data volume
• Measure response time (should meet SLA)
• Profile with SE30/SAT
• Optimize as needed

Test 2: Concurrent Users
• 10 users executing simultaneously
• 50 users executing simultaneously
• 100 users executing simultaneously
• Monitor: System response time, database wait times, CPU usage

Test 3: Volume Testing
• Execute with maximum expected data volume
• Example: Report with 100,000 records
• Verify: Completes within acceptable time, no memory overflow

Test 4: Stress Testing
• Execute beyond normal capacity
• Identify breaking point
• Verify graceful degradation (no crashes)

Performance Tuning Checklist:

Database Level:
☑ Indexes created for frequently used fields
☑ Statistics updated regularly (DB13)
☑ No full table scans in critical queries
☑ Buffer hit ratio > 95%

ABAP Code Level:
☑ No SELECT in loops (use FOR ALL ENTRIES)
☑ Specific field lists (no SELECT *)
☑ Field symbols used for large structures
☑ Memory freed after processing large datasets

System Level:
☑ Appropriate work process allocation
☑ Sufficient memory configured
☑ Background job classes used correctly
☑ Parallel processing for batch jobs

Enhancement for User Request:
${instruction}

Performance Improvement Results:

Document performance improvements:
• Baseline: [Original response time]
• After Optimization: [New response time]
• Improvement: [% or factor improvement]
• Techniques Applied: [List optimization methods used]

Example:
• Baseline: Report execution 45 seconds
• After adding indexes and optimizing SELECT: 8 seconds
• Improvement: 82% faster (5.6x improvement)
• Techniques: Secondary index on MARD, FOR ALL ENTRIES optimization, package processing`;
  }

  private generateUISpecifications(section: DocumentSection, instruction: string): string {
    return `${section.content}

Comprehensive User Interface Specifications:

UI Design Principles:

Core Design Guidelines:
• User-Centered Design: Interface designed for end-user efficiency and ease of use
• Consistency: Follow SAP standard UI patterns and conventions
• Clarity: Clear labels, logical field grouping, intuitive navigation
• Efficiency: Minimize clicks and data entry required to complete tasks
• Error Prevention: Validate input in real-time, provide clear guidance
• Accessibility: Support keyboard navigation, screen readers, high-contrast modes

Selection Screen Design:

Screen Structure and Layout:

┌─────────────────────────────────────────────────────────────────────────┐
│ [Transaction Icon] Z_TCODE - Transaction Description                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Block 1: Organizational Data                                          │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ ○ Plant                  [________] to [________]    [↓]        │  │
│  │ ○ Storage Location       [________] to [________]    [↓]        │  │
│  │ ○ Company Code           [________] to [________]    [↓]        │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  Block 2: Material Selection                                           │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ ○ Material Number        [__________________] to [________] [↓] │  │
│  │ ○ Material Group         [________] to [________]    [↓]        │  │
│  │ ○ Material Type          [________] to [________]    [↓]        │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  Block 3: Date Selection                                               │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │   From Date              [__/__/____]  [📅]                      │  │
│  │   To Date                [__/__/____]  [📅]                      │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  Block 4: Additional Options                                           │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ ☐ Include Zero Stock                                             │  │
│  │ ☐ Include Blocked Materials                                      │  │
│  │   Output Variant         [________________]  [↓]                 │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  [Execute] [Check] [Save Variant] [Get Variant] [Delete Variant]      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Selection Screen Element Specifications:

Element Type 1: SELECT-OPTIONS (Range Input)
─────────────────────────────────────────────

Definition:
SELECT-OPTIONS: s_werks FOR marc-werks OBLIGATORY.

Visual Presentation:
○ Plant                  [________] to [________]    [↓]
  │                         │            │             └─ Multiple selection button
  │                         │            └─ High value (range)
  │                         └─ Low value (range)
  └─ Radio button for multiple selection popup

Features:
• Single value entry: Enter one value in low field
• Range entry: Enter low and high values
• Multiple selection popup: Click [↓] button for advanced options
  - Include values
  - Exclude values
  - Pattern matching (* and + wildcards)
  - Range specifications
• Copy/Paste support
• F4 search help (value list)
• F1 field help (documentation)

Multiple Selection Dialog:
┌─────────────────────────────────────────────────────────────────┐
│ Multiple Selection for Plant                              [X]   │
├─────────────────────────────────────────────────────────────────┤
│ ○ Select Values   ○ Exclude Values   ○ Select Ranges           │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Include                                                     │ │
│ │ ├─ 1000  (Plant US01)                                      │ │
│ │ ├─ 2000  (Plant EU01)                                      │ │
│ │ ├─ 3000  (Plant AP01)                                      │ │
│ │ └─ 1000...1999  (Range: US Plants)                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Exclude                                                     │ │
│ │ ├─ 9999  (Test plant)                                      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [↑ Insert Row] [↓ Delete Row] [Upload] [Download]             │
│                                                                 │
│  [Copy] [Execute] [Cancel]                                      │
└─────────────────────────────────────────────────────────────────┘

Element Type 2: PARAMETERS (Single Value Input)
─────────────────────────────────────────────────

Date Parameter:
PARAMETERS: p_stdat TYPE datum DEFAULT sy-datum OBLIGATORY.

Visual Presentation:
  From Date              [01/15/2024]  [📅]
                           └─ Date picker icon

Features:
• Manual date entry: Type date directly
• Date picker: Click calendar icon to select from visual calendar
• Format validation: Automatically validates date format
• Logical validation: Date not in future, within valid range
• Default value: Pre-populated with current date

Checkbox Parameter:
PARAMETERS: p_zero AS CHECKBOX DEFAULT 'X'.

Visual Presentation:
☑ Include Zero Stock
 └─ Checked by default

Features:
• Toggle on/off with click or spacebar
• Default value configurable
• Can be made mandatory or optional

Dropdown List Parameter:
PARAMETERS: p_bukrs TYPE bukrs AS LISTBOX VISIBLE LENGTH 20.

Visual Presentation:
  Company Code       [1000 - Company US01 ▼]

Features:
• Pre-defined list of values
• Search within dropdown (type to filter)
• F4 search help for extended list
• Display key and description

Element Type 3: RADIOBUTTONS (Mutually Exclusive Options)
───────────────────────────────────────────────────────────

Definition:
PARAMETERS: r_opt1 RADIOBUTTON GROUP grp1 DEFAULT 'X',
            r_opt2 RADIOBUTTON GROUP grp1,
            r_opt3 RADIOBUTTON GROUP grp1.

Visual Presentation:
  Report Type:
    ◉ Summary Report
    ○ Detailed Report
    ○ Comparison Report

Features:
• Only one option can be selected at a time
• Default selection configured in code
• Keyboard navigation: Arrow keys to switch

Search Help (F4) Configuration:

Standard Search Help:

* Attach standard search help to parameter
PARAMETERS: s_werks TYPE werks_d.

* Search help automatically from data element
* Shows list from T001W with plant code and name


Custom Search Help:

FORM f4_help_storage_location.
  * Custom F4 help filtered by selected plants
  DATA: lt_return TYPE TABLE OF ddshretval.

  CALL FUNCTION 'F4IF_INT_TABLE_VALUE_REQUEST'
    EXPORTING
      retfield        = 'LGORT'
      dynpprog        = sy-repid
      dynpnr          = sy-dynnr
      dynprofield     = 'S_LGORT'
      value_org       = 'S'
    TABLES
      value_tab       = lt_storage_locations  "Pre-filtered by plant
      return_tab      = lt_return
    EXCEPTIONS
      parameter_error = 1
      no_values_found = 2
      OTHERS          = 3.
ENDFORM.

* Attach custom F4 to field
AT SELECTION-SCREEN ON VALUE-REQUEST FOR s_lgort-low.
  PERFORM f4_help_storage_location.


Field-Level Help (F1):

Documentation:
• Provide clear field-level documentation for all parameters
• Access via F1 key when cursor on field
• Content: Field purpose, valid values, examples

Example F1 Documentation:
┌─────────────────────────────────────────────────────────────────┐
│ Field Documentation: Plant                                      │
├─────────────────────────────────────────────────────────────────┤
│ Field Name: S_WERKS                                             │
│ Description: Plant / Site Selection                             │
│                                                                 │
│ Purpose:                                                        │
│ Specifies the plant(s) for which to display stock data. Plant  │
│ is a mandatory field. Multiple plants can be selected using the │
│ multiple selection feature.                                     │
│                                                                 │
│ Valid Values:                                                   │
│ • 4-character plant code (e.g., 1000, 2000)                    │
│ • Must exist in T001W (Plants/Branches)                        │
│ • User must have authorization for selected plant(s)           │
│                                                                 │
│ Examples:                                                       │
│ • Single plant: Enter 1000 in low value field                 │
│ • Multiple plants: Use multiple selection (↓ button)           │
│ • Range: Enter 1000 in low, 1999 in high (all 1xxx plants)    │
│                                                                 │
│ See Also: T001W, Authorization object M_MATE_WRK               │
└─────────────────────────────────────────────────────────────────┘

Input Validation:

Real-Time Validation (AT SELECTION-SCREEN):


* Validate date range
AT SELECTION-SCREEN.
  IF p_endat < p_stdat.
    MESSAGE e001(zmsg) WITH 'To Date must be greater than or equal to From Date'
      DISPLAY LIKE 'E'.
  ENDIF.

  IF p_stdat > sy-datum.
    MESSAGE e002(zmsg) WITH 'From Date cannot be in the future'
      DISPLAY LIKE 'E'.
  ENDIF.

* Validate mandatory plant selection
AT SELECTION-SCREEN ON s_werks.
  IF s_werks[] IS INITIAL.
    MESSAGE e003(zmsg) WITH 'Plant is mandatory. Enter at least one plant.'
      DISPLAY LIKE 'E'.
  ENDIF.

* Validate plant exists
AT SELECTION-SCREEN ON s_werks.
  LOOP AT s_werks.
    SELECT SINGLE werks FROM t001w
      INTO @DATA(lv_werks)
      WHERE werks = @s_werks-low.

    IF sy-subrc <> 0.
      MESSAGE e004(zmsg) WITH 'Plant' s_werks-low 'does not exist'
        DISPLAY LIKE 'E'.
    ENDIF.
  ENDLOOP.

* Authorization check for plants
AT SELECTION-SCREEN ON s_werks.
  LOOP AT s_werks.
    AUTHORITY-CHECK OBJECT 'M_MATE_WRK'
      ID 'ACTVT' FIELD '03'
      ID 'WERKS' FIELD s_werks-low.

    IF sy-subrc <> 0.
      MESSAGE e005(zmsg) WITH 'No authorization for Plant' s_werks-low
        DISPLAY LIKE 'E'.
    ENDIF.
  ENDLOOP.


Error Message Display:
• Error messages displayed at bottom of screen in red
• Cursor positioned at problematic field
• User must correct before proceeding

Selection Variant Management:

Save Variant:
• Button: [Save Variant]
• User enters variant name and description
• Option to save as user-specific or global (with authorization)
• Variant stores all selection criteria values

Get Variant:
• Button: [Get Variant]
• Lists available variants (user-specific + global)
• Select variant to load saved criteria

Delete Variant:
• Button: [Delete Variant]
• Removes saved variant (user can only delete own variants unless authorized)

Transaction Screen Design (Not Selection Screen):

For data entry transactions (as opposed to reports):

Screen Layout Example (Goods Issue Transaction):

┌─────────────────────────────────────────────────────────────────────────┐
│ [Icon] MIGO - Goods Issue                                         [X]   │
├─────────────────────────────────────────────────────────────────────────┤
│ Document Date: [01/15/2024] [📅]     Posting Date: [01/15/2024] [📅]  │
│ Reference Doc:  [________________]                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Item Details:                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ Material *        [__________________] (Description)              │ │
│  │ Plant *           [____]  (Plant Name)                            │ │
│  │ Storage Location * [____]  (Stor. Loc. Name)                      │ │
│  │ Quantity *        [_____________] [___] UOM                       │ │
│  │ Movement Type     [___] (Description)                             │ │
│  │ Cost Center       [__________] (Description)                      │ │
│  │ GL Account        [__________] (Description)                      │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  Current Stock: 1,234.56 PC                                            │
│  Available: 1,234.56 PC     Quality Insp: 0.00 PC     Blocked: 0.00 PC│
│                                                                         │
│  ☐ Post in Background       Reference: [________________]              │
│                                                                         │
│  [Check] [Post] [Clear] [Park] [Display Document]                     │
│                                                                         │
│  Messages: ________________________________________________             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Screen Element Guidelines:

Mandatory Fields:
• Marked with red asterisk (*)
• Cannot leave screen without populating
• Clear error message if left blank

Optional Fields:
• No asterisk
• Can be left blank
• May have default values

Field Validation:
• Real-time validation on field exit (PAI - Process After Input)
• Display error message immediately if invalid
• Prevent further processing until corrected

Button Placement:
• Primary actions (Post, Execute): Prominent, left side
• Secondary actions (Save Variant, Export): Right side or separate group
• Destructive actions (Delete, Cancel): Right side, visually distinct

Accessibility Features:

Keyboard Navigation:
• Tab: Move to next field
• Shift+Tab: Move to previous field
• Enter: Execute primary action (same as [Execute] or [Post] button)
• F1: Field help
• F4: Search help
• F3: Back/Exit
• F8: Execute (for reports)
• Ctrl+C/V: Copy/Paste
• Ctrl+F: Find on list/table control

Screen Reader Support:
• Field labels properly associated with input fields
• Error messages announced
• Button labels descriptive
• Logical tab order

Enhancement Based on User Instruction:
${instruction}

User Experience Best Practices:

1. Minimize Data Entry:
   • Provide intelligent defaults (e.g., current date, user's default plant)
   • Remember last used values (if applicable)
   • Allow copy/paste from external sources (Excel, etc.)

2. Provide Immediate Feedback:
   • Real-time field validation
   • Progress indicators for long-running operations
   • Confirmation messages for successful actions

3. Error Handling:
   • Clear, actionable error messages
   • Suggest corrective action
   • Position cursor at error field
   • Highlight erroneous fields

4. Consistency:
   • Follow SAP standard UI patterns
   • Use consistent terminology
   • Maintain consistent button placement across similar screens

5. Performance:
   • Fast screen response time (< 2 seconds)
   • Asynchronous processing for long-running operations
   • Progress indicators during processing

Responsive Design:
• Support for various screen resolutions (1024x768 minimum, up to 4K)
• Adjustable column widths in ALV grids
• Scrollable areas for large data volumes`;
  }

  private generateGenericEnhancement(section: DocumentSection, instruction: string, documentType: string): string {
    return `${section.content}

Enhancement Based on User Request:

${instruction}

Detailed Specification:

This section has been enhanced to incorporate the requested functionality. The enhancement addresses the following aspects:

1. Requirement Clarification:
• Business Need: [Describe the business driver for this enhancement]
• User Story: As a [user role], I need [functionality] so that [business value]
• Acceptance Criteria: [List specific, measurable criteria for completion]

2. Functional Impact:
• Affected Modules: [List SAP modules or components impacted]
• Dependencies: [Identify any prerequisites or related functionality]
• Integration Points: [Describe how this integrates with existing functionality]

3. Technical Approach:
${documentType === 'technical' ? this.generateTechnicalApproach(instruction) : this.generateFunctionalApproach(instruction)}

4. Implementation Considerations:
• Data Requirements: [Specify any new data fields, tables, or structures needed]
• Authorization: [Define security and authorization requirements]
• Performance: [Address performance implications and optimization strategies]
• Testing: [Outline testing approach and key test scenarios]

5. Change Impact:
• Process Changes: [Document any business process modifications]
• Training Needs: [Identify user training requirements]
• Documentation: [List documentation updates needed]
• Migration/Conversion: [Address data migration if applicable]

6. Risk Assessment:
• Technical Risks: [Identify potential technical challenges]
• Business Risks: [Highlight business impacts and mitigation strategies]
• Timeline Risks: [Note any schedule dependencies or constraints]

7. Next Steps:
• Development Effort: [Estimate development time and resources]
• Testing Effort: [Estimate testing time and requirements]
• Go-Live Plan: [Outline deployment approach]
• Support Model: [Define post-implementation support]

Please review this enhancement proposal and provide feedback or approval to proceed with detailed design and implementation.`;
  }

  private generateTechnicalApproach(instruction: string): string {
    return `Technical Implementation:

Development Objects Required:
• Program: Z[MODULE]_[FUNCTION]_[PURPOSE]
• Function Module: Z_FM_[PURPOSE]
• Class: ZCL_[PURPOSE]
• Database Table: Z[TABLE_NAME] (if new table required)
• Data Elements: Z_[ELEMENT_NAME]
• Structures: Z[STRUCTURE_NAME]

Code Architecture:
• Design Pattern: [e.g., MVC, Factory, Singleton, Strategy]
• ABAP Version: 7.40+ (Modern ABAP syntax)
• Object-Oriented Approach: Classes and interfaces preferred over function modules
• Modular Design: Separate concerns (data access, business logic, presentation)

Database Design:
• New Tables: Define structure, fields, keys, indexes
• Table Relationships: Foreign keys and referential integrity
• Data Volume: Estimated size and growth rate
• Archiving Strategy: Define retention and archiving approach

Interface Specifications (if applicable):
• RFC Function Module: Signature, parameters, exceptions
• Web Service: WSDL definition, operations, message format
• IDoc: Message type, segment structure, partner profile
• API: RESTful or SOAP, authentication method, payload format

Error Handling:
• Exception Classes: CX_[EXCEPTION_NAME]
• Logging: Application log object and subobject
• Retry Logic: For recoverable errors
• Rollback Strategy: Transaction management

Testing Strategy:
• Unit Tests: ABAP Unit test classes for all methods
• Integration Tests: End-to-end testing with dependent systems
• Performance Tests: Load and stress testing
• Security Tests: Authorization and penetration testing

Based on the instruction: ${instruction}

Recommended approach is to...`;
  }

  private generateFunctionalApproach(instruction: string): string {
    return `Functional Solution Design:

Business Process Flow:
1. [Step 1 description with user action]
2. [Step 2 description with system response]
3. [Step 3 description with validation/processing]
4. [Step 4 description with output/result]

User Interface Design:
• Screen Type: [Selection screen / Transaction screen / Report output]
• Input Fields: [List of required and optional fields]
• Validation Rules: [Field-level and business rule validation]
• Output Format: [ALV Grid / Classical list / Form / Document]

Master Data Requirements:
• Existing Tables: [List standard SAP tables used]
• Configuration: [Customizing settings required]
• Data Migration: [Any master data setup or conversion needed]

Business Rules:
• Rule 1: [Describe business rule and logic]
• Rule 2: [Describe validation or calculation rule]
• Rule 3: [Describe exception handling rule]

User Roles and Authorization:
• Role 1: [Role name] - [Permissions and access level]
• Role 2: [Role name] - [Permissions and access level]

Reporting Requirements (if applicable):
• Report Scope: [What data is included]
• Selection Criteria: [User input parameters]
• Output Columns: [Fields displayed in report]
• Aggregation: [Totals, subtotals, grouping]

Integration with Standard SAP:
• Standard Transactions: [List related T-codes]
• Configuration: [IMG activities required]
• Enhancements: [User exits, BAdIs, or implicit enhancements needed]

Based on the instruction: ${instruction}

Proposed solution includes...`;
  }
}
