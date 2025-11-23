import type { DocumentSection } from '../types/document';
import { ContentGenerator } from './contentGenerator';

export async function processAIInstruction(
  instruction: string,
  sections: DocumentSection[]
): Promise<DocumentSection[]> {
  // Simulate processing time for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const generator = new ContentGenerator();
  const lowerInstruction = instruction.toLowerCase();

  // Determine document type from sections
  const documentType = sections.some(s =>
    s.title.toLowerCase().includes('technical') ||
    s.title.toLowerCase().includes('development')
  ) ? 'technical' : 'functional';

  // Strategy 1: Add new sections based on instruction
  if (shouldAddNewSection(lowerInstruction)) {
    return addIntelligentSection(sections, instruction, generator, documentType);
  }

  // Strategy 2: Enhance existing sections
  if (shouldEnhanceSection(lowerInstruction, sections)) {
    return enhanceExistingSections(sections, instruction, generator, documentType);
  }

  // Strategy 3: Modify specific section
  const targetSection = identifyTargetSection(lowerInstruction, sections);
  if (targetSection) {
    return updateSpecificSection(sections, targetSection, instruction, generator, documentType);
  }

  // Default: Enhance the most relevant section
  return enhanceRelevantSection(sections, instruction, generator, documentType);
}

function shouldAddNewSection(instruction: string): boolean {
  const addKeywords = ['add', 'create', 'include', 'new section', 'additional'];
  return addKeywords.some(keyword => instruction.includes(keyword));
}

function shouldEnhanceSection(instruction: string, sections: DocumentSection[]): boolean {
  const enhanceKeywords = ['enhance', 'expand', 'improve', 'detail', 'elaborate', 'comprehensive'];
  return enhanceKeywords.some(keyword => instruction.includes(keyword));
}

function identifyTargetSection(instruction: string, sections: DocumentSection[]): DocumentSection | null {
  const lowerInstruction = instruction.toLowerCase();

  // Try to find section by name mentioned in instruction
  for (const section of sections) {
    if (lowerInstruction.includes(section.title.toLowerCase())) {
      return section;
    }

    // Check subsections
    if (section.subsections) {
      for (const subsection of section.subsections) {
        if (lowerInstruction.includes(subsection.title.toLowerCase())) {
          return subsection;
        }
      }
    }
  }

  return null;
}

function addIntelligentSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const lowerInstruction = instruction.toLowerCase();

  // Determine what type of section to add
  if (lowerInstruction.includes('user role') || lowerInstruction.includes('authorization') || lowerInstruction.includes('security')) {
    return addAuthorizationSection(sections, instruction, generator, documentType);
  }

  if (lowerInstruction.includes('test') || lowerInstruction.includes('testing')) {
    return addTestingSection(sections, instruction, generator, documentType);
  }

  if (lowerInstruction.includes('error') || lowerInstruction.includes('exception')) {
    return addErrorHandlingSection(sections, instruction, generator, documentType);
  }

  if (lowerInstruction.includes('performance') || lowerInstruction.includes('optimization')) {
    return addPerformanceSection(sections, instruction, generator, documentType);
  }

  if (lowerInstruction.includes('data migration') || lowerInstruction.includes('migration')) {
    return addDataMigrationSection(sections, instruction, generator, documentType);
  }

  if (lowerInstruction.includes('interface') || lowerInstruction.includes('integration')) {
    return addInterfaceSection(sections, instruction, generator, documentType);
  }

  // Generic new section
  return addGenericSection(sections, instruction, generator, documentType);
}

function addAuthorizationSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const newSection: DocumentSection = {
    id: String(sections.length + 1),
    title: 'Security and Authorization',
    content: generator.generateDetailedContent({
      instruction,
      documentType,
      currentSection: { id: '', title: '', content: '', level: 1 },
      allSections: sections
    }),
    level: 1,
    subsections: [
      {
        id: `${sections.length + 1}.1`,
        title: 'Authorization Objects and Roles',
        content: `Authorization Configuration:

Role-Based Access Control:
• Define user roles with specific authorization profiles
• Implement least privilege principle
• Segregation of duties (SoD) controls

Authorization Objects:
• M_MATE_WRK - Material Master by Plant
• M_MSEG_BWA - Goods Movements by Movement Type
• S_TCODE - Transaction Code Authorization

Field-Level Security:
• Sensitive fields masked for unauthorized users
• Audit trail for critical data changes`,
        level: 2
      },
      {
        id: `${sections.length + 1}.2`,
        title: 'Security Testing and Validation',
        content: `Security Test Cases:

Test Scenario 1: Authorized User Access
• User with proper authorization executes transaction successfully
• All authorized functions accessible

Test Scenario 2: Unauthorized Access Prevention
• User without authorization receives clear error message
• No data leakage or system access granted
• Failed authorization attempts logged

Test Scenario 3: Field-Level Security
• Sensitive fields hidden/masked for unauthorized users
• Data export restrictions enforced`,
        level: 2
      }
    ]
  };

  return [...sections, newSection];
}

function addTestingSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  // Find or enhance existing testing section
  const testingSectionIndex = sections.findIndex(s =>
    s.title.toLowerCase().includes('test')
  );

  if (testingSectionIndex >= 0) {
    return sections.map((section, index) => {
      if (index === testingSectionIndex) {
        return {
          ...section,
          content: generator.generateDetailedContent({
            instruction,
            documentType,
            currentSection: section,
            allSections: sections
          }),
          subsections: enhanceTestingSubsections(section, instruction, generator, documentType)
        };
      }
      return section;
    });
  }

  // Add new testing section if doesn't exist
  const newSection: DocumentSection = {
    id: String(sections.length + 1),
    title: 'Testing Requirements and Strategy',
    content: generator.generateTestingContent({
      id: '',
      title: 'Testing Requirements',
      content: '',
      level: 1
    }, instruction),
    level: 1,
    subsections: [
      {
        id: `${sections.length + 1}.1`,
        title: 'Unit Testing Scenarios',
        content: 'Detailed unit test cases covering all functional requirements.',
        level: 2
      },
      {
        id: `${sections.length + 1}.2`,
        title: 'Integration Testing',
        content: 'End-to-end integration test scenarios with dependent systems and modules.',
        level: 2
      },
      {
        id: `${sections.length + 1}.3`,
        title: 'User Acceptance Testing (UAT)',
        content: 'Business user validation scenarios and acceptance criteria.',
        level: 2
      }
    ]
  };

  return [...sections, newSection];
}

function addErrorHandlingSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const newSection: DocumentSection = {
    id: String(sections.length + 1),
    title: 'Error Handling and Exception Management',
    content: generator.generateErrorHandlingContent({
      id: '',
      title: 'Error Handling',
      content: '',
      level: 1
    }, instruction),
    level: 1,
    subsections: [
      {
        id: `${sections.length + 1}.1`,
        title: 'Error Categories and Response',
        content: 'Classification of errors and appropriate handling strategies for each category.',
        level: 2
      },
      {
        id: `${sections.length + 1}.2`,
        title: 'Logging and Monitoring',
        content: 'Application logging framework and error monitoring procedures.',
        level: 2
      }
    ]
  };

  return [...sections, newSection];
}

function addPerformanceSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const newSection: DocumentSection = {
    id: String(sections.length + 1),
    title: 'Performance Optimization',
    content: generator.generatePerformanceContent({
      id: '',
      title: 'Performance',
      content: '',
      level: 1
    }, instruction),
    level: 1,
    subsections: [
      {
        id: `${sections.length + 1}.1`,
        title: 'Database Optimization',
        content: 'Index strategy, query optimization, and database performance tuning.',
        level: 2
      },
      {
        id: `${sections.length + 1}.2`,
        title: 'Code Optimization',
        content: 'ABAP code performance best practices and optimization techniques.',
        level: 2
      }
    ]
  };

  return [...sections, newSection];
}

function addDataMigrationSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const newSection: DocumentSection = {
    id: String(sections.length + 1),
    title: 'Data Migration Strategy',
    content: `Comprehensive Data Migration Plan:

Migration Approach:
• Phased migration by business unit or data category
• Parallel run period to validate data accuracy
• Cutover strategy with rollback plan

Source Systems Analysis:
• Legacy System A: Customer master data (500,000 records)
• Legacy System B: Transaction history (2,000,000 records)
• Legacy System C: Reference data (50 configuration tables)

Data Mapping and Transformation:
• Field-level mapping from source to target (SAP) tables
• Data cleansing rules for data quality improvement
• Transformation logic for format and business rule conversions
• Unit of measure, currency, and date format standardization

Migration Execution:
• Extract data from source systems
• Transform and validate data
• Load data into SAP staging tables
• Execute SAP standard or custom migration programs
• Validate completeness and accuracy via reconciliation reports

${instruction}`,
    level: 1,
    subsections: [
      {
        id: `${sections.length + 1}.1`,
        title: 'Data Mapping Specifications',
        content: `Detailed Field Mapping:

Source → Target Mapping Tables:
Customer Master: LEGACY_CUSTOMER → KNA1/KNA2
Material Master: LEGACY_ITEM → MARA/MARC/MARD
Vendor Master: LEGACY_VENDOR → LFA1/LFB1

Transformation Rules:
• Date Format: MM/DD/YYYY → YYYYMMDD (SAP internal)
• Material Number: Remove spaces, pad with leading zeros to 18 characters
• Vendor Number: Validate against existing vendors, create new if needed
• Currency: Convert ISO codes to SAP currency keys (TCURC)`,
        level: 2
      },
      {
        id: `${sections.length + 1}.2`,
        title: 'Migration Testing and Validation',
        content: `Migration Testing Strategy:

Test Phases:
1. Unit Testing: Validate individual migration scripts with sample data
2. Integration Testing: End-to-end migration of subset of data
3. Volume Testing: Full volume migration in test environment
4. User Acceptance Testing: Business validation of migrated data

Validation Criteria:
• 100% of critical data migrated successfully
• Data integrity checks pass (referential integrity, business rules)
• Reconciliation: Source count vs. Target count matches
• Data quality: Duplicates removed, invalid data flagged
• Performance: Migration completes within defined time window

Reconciliation Reports:
• Record counts by entity (customers, materials, transactions)
• Value reconciliation (financial data balances)
• Exception reports (rejected records with reasons)`,
        level: 2
      }
    ]
  };

  return [...sections, newSection];
}

function addInterfaceSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const newSection: DocumentSection = {
    id: String(sections.length + 1),
    title: 'Interface and Integration Specifications',
    content: generator.generateInterfaceSpecifications({
      id: '',
      title: 'Interfaces',
      content: '',
      level: 1
    }, instruction),
    level: 1,
    subsections: [
      {
        id: `${sections.length + 1}.1`,
        title: 'Inbound Interfaces',
        content: 'Specifications for data flowing into SAP from external systems.',
        level: 2
      },
      {
        id: `${sections.length + 1}.2`,
        title: 'Outbound Interfaces',
        content: 'Specifications for data flowing from SAP to external systems.',
        level: 2
      }
    ]
  };

  return [...sections, newSection];
}

function addGenericSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const newSection: DocumentSection = {
    id: String(sections.length + 1),
    title: deriveTitleFromInstruction(instruction),
    content: generator.generateDetailedContent({
      instruction,
      documentType,
      currentSection: { id: '', title: '', content: '', level: 1 },
      allSections: sections
    }),
    level: 1
  };

  return [...sections, newSection];
}

function deriveTitleFromInstruction(instruction: string): string {
  // Extract key topics from instruction
  const lowerInstruction = instruction.toLowerCase();

  if (lowerInstruction.includes('monitoring')) return 'Monitoring and Alerting';
  if (lowerInstruction.includes('backup')) return 'Backup and Recovery';
  if (lowerInstruction.includes('configuration')) return 'Configuration Management';
  if (lowerInstruction.includes('deployment')) return 'Deployment Strategy';
  if (lowerInstruction.includes('support')) return 'Support and Maintenance';
  if (lowerInstruction.includes('training')) return 'Training and Documentation';

  return 'Additional Requirements';
}

function enhanceExistingSections(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  return sections.map(section => {
    if (isSectionRelevant(section, instruction)) {
      return {
        ...section,
        content: generator.generateDetailedContent({
          instruction,
          documentType,
          currentSection: section,
          allSections: sections
        }),
        subsections: section.subsections?.map(sub => ({
          ...sub,
          content: enhanceSubsectionContent(sub, instruction, generator, documentType)
        }))
      };
    }
    return section;
  });
}

function isSectionRelevant(section: DocumentSection, instruction: string): boolean {
  const lowerInstruction = instruction.toLowerCase();
  const lowerTitle = section.title.toLowerCase();

  // Check for keyword matches
  const keywords = lowerInstruction.split(' ').filter(word => word.length > 3);
  return keywords.some(keyword => lowerTitle.includes(keyword)) ||
         lowerInstruction.includes(lowerTitle);
}

function enhanceSubsectionContent(
  subsection: DocumentSection,
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): string {
  return generator.generateDetailedContent({
    instruction,
    documentType,
    currentSection: subsection,
    allSections: []
  });
}

function enhanceTestingSubsections(
  section: DocumentSection,
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const baseSubsections = section.subsections || [];

  // Add comprehensive testing subsections
  const enhancedSubsections: DocumentSection[] = [
    {
      id: `${section.id}.1`,
      title: 'Unit Testing Scenarios',
      content: 'Comprehensive unit test cases with detailed test data and expected results.',
      level: 2
    },
    {
      id: `${section.id}.2`,
      title: 'Integration Testing',
      content: 'End-to-end integration testing scenarios across modules and systems.',
      level: 2
    },
    {
      id: `${section.id}.3`,
      title: 'User Acceptance Testing (UAT)',
      content: 'Business user validation scenarios with real-world data and workflows.',
      level: 2
    },
    {
      id: `${section.id}.4`,
      title: 'Performance Testing',
      content: 'Load testing, stress testing, and performance benchmarking scenarios.',
      level: 2
    },
    {
      id: `${section.id}.5`,
      title: 'Negative Testing Scenarios',
      content: 'Error handling validation with invalid inputs and edge cases.',
      level: 2
    }
  ];

  return enhancedSubsections;
}

function updateSpecificSection(
  sections: DocumentSection[],
  targetSection: DocumentSection,
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  return sections.map(section => {
    if (section.id === targetSection.id) {
      return {
        ...section,
        content: generator.generateDetailedContent({
          instruction,
          documentType,
          currentSection: section,
          allSections: sections
        })
      };
    }

    // Check subsections
    if (section.subsections) {
      return {
        ...section,
        subsections: section.subsections.map(sub => {
          if (sub.id === targetSection.id) {
            return {
              ...sub,
              content: generator.generateDetailedContent({
                instruction,
                documentType,
                currentSection: sub,
                allSections: sections
              })
            };
          }
          return sub;
        })
      };
    }

    return section;
  });
}

function enhanceRelevantSection(
  sections: DocumentSection[],
  instruction: string,
  generator: ContentGenerator,
  documentType: 'functional' | 'technical'
): DocumentSection[] {
  const lowerInstruction = instruction.toLowerCase();

  // Find the most relevant section based on instruction content
  let targetSectionIndex = sections.findIndex(section =>
    isSectionRelevant(section, instruction)
  );

  // If no specific section found, enhance "Business Requirements" or "Functional Requirements"
  if (targetSectionIndex === -1) {
    targetSectionIndex = sections.findIndex(s =>
      s.title.toLowerCase().includes('requirement') ||
      s.title.toLowerCase().includes('executive summary')
    );
  }

  // Default to section 2 if still not found
  if (targetSectionIndex === -1) {
    targetSectionIndex = Math.min(1, sections.length - 1);
  }

  return sections.map((section, index) => {
    if (index === targetSectionIndex) {
      return {
        ...section,
        content: `${section.content}\n\n${generator.generateDetailedContent({
          instruction,
          documentType,
          currentSection: section,
          allSections: sections
        })}`
      };
    }
    return section;
  });
}
