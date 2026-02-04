# Lead Nurturing Conversation Analysis Project

## Project Overview
This project analyzes customer conversation transcripts from CarGurus to understand lead capture patterns, conversation quality, and engagement metrics. The goal is to identify opportunities for improving lead generation and customer support effectiveness.

## Purpose
- Analyze customer conversation transcripts (from LivePerson/chat systems)
- Categorize conversations by intent and topic
- Track lead capture metrics (email collection, submission rates)
- Identify conversation quality issues (unclear intents, breaks in engagement)
- Provide interactive dashboards for stakeholders to explore findings

## Key Components

### Python Analysis Scripts
All scripts process Excel/CSV files containing conversation transcripts and output structured CSV reports:

- `analyze_conversations.py` - Main analysis pipeline: parses transcripts, categorizes conversations, calculates metrics
- `analyze_lead_submission_pii.py` - Analyzes PII collection and lead submission patterns
- `analyze_multi_intent_combinations.py` - Identifies conversations with multiple customer intents
- `recalculate_lead_submission.py` - Recalculates lead metrics with updated logic
- `recalculate_lead_v2.py` - Version 2 of lead metric calculations
- `update_multi_intent.py` - Updates multi-intent classification

### HTML Dashboards
Interactive web interfaces for viewing analysis results:

- `index.html` - Entry point that redirects to main dashboard
- `leads-hub-figma.html` - Main dashboard (Figma-designed UI)
- `leads-hub-figma-styles.css` - Styling for main dashboard
- `settings.html` / `settings-styles.css` - Configuration/settings interface
- `leads-hub-quick-filters.html` - Quick filtering interface (prototype)
- `quick-filters-prototype.html` - Alternative quick filter design
- `quick-filters-script.js` / `quick-filters-styles.css` - Quick filter assets

### Data Files

#### Input Data
- `Lead Gen Transcripts *.xlsx` - Raw conversation transcripts by date
- `LivePerson Transcripts/` - Additional transcript files
- `SAMPLE_CONVERSATIONS_BY_CATEGORY.txt` - Sample categorized conversations

#### Output Data (CSV)
Pattern: `output_*.csv` files contain various analysis results:
- `output1_*_conversations.csv` - Individual conversation details
- `output2_*_categories.csv` - Category distribution
- `output3_*_metrics.csv` - Aggregate metrics
- `output_*_lead_*.csv` - Lead capture analysis
- `output_break_*.csv` - Conversation break analysis
- `output_unclear_*.csv` - Unclear intent analysis
- `output_extended_*.csv` - Extended/multi-intent analysis

### Documentation (Markdown Reports)
- `LEADS_HUB_FIGMA_README.md` - Documentation for main dashboard
- `QUICK_FILTERS_README.md` - Quick filters feature documentation
- `DEPLOYMENT_GUIDE.md` - How to deploy the dashboards
- `SHOPPER_SIGNALS_PRD.md` - Product requirements for shopper signals feature
- `JIRA_TICKET_SHOPPER_SIGNALS.md` - Jira ticket specification
- `*_REPORT.md` - Various analysis reports (break analysis, unclear categories, etc.)
- `SAMPLE_CONVERSATIONS_README.md` - Documentation for sample data

### Deployment
- `deploy/` - Production-ready files for deployment (HTML, CSS)

## Technology Stack

### Backend/Analysis
- **Python 3.x** with pandas, numpy for data processing
- **Regular expressions** for transcript parsing
- **Excel/CSV** for data I/O

### Frontend
- **Vanilla HTML/CSS/JavaScript** (no framework)
- **Figma-designed UI** (design system in CSS)
- Interactive filtering and visualization

### Version Control
- **Git** repository
- Main branch: `main`

## Data Flow

1. **Input**: Excel files with conversation transcripts
2. **Processing**: Python scripts parse and analyze conversations
3. **Output**: CSV files with structured data
4. **Visualization**: HTML dashboards read CSV data and display interactively
5. **Deployment**: Static files deployed to web hosting

## Conversation Categorization

The analysis pipeline categorizes conversations into:
- **Intent types**: Quote request, vehicle inquiry, financing, trade-in, test drive, etc.
- **Lead capture status**: Email captured, email only, full lead submission
- **Resolution status**: Resolved, unresolved, unclear
- **Engagement patterns**: Breaks in conversation, unresponsive periods
- **Multi-intent**: Conversations covering multiple topics

## Development Workflow

### Running Analysis Scripts
```bash
# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run main analysis
python analyze_conversations.py

# Run specific analysis
python analyze_lead_submission_pii.py
```

### Viewing Dashboards Locally
Simply open `index.html` in a web browser (or use a local server like `python -m http.server`).

### Deployment
See `DEPLOYMENT_GUIDE.md` for deployment instructions.

## Important Context

### Transcript Format
Conversations follow the pattern:
```
[YYYY-MM-DD HH:MM:SS] Consumer -- Message text
[YYYY-MM-DD HH:MM:SS] Agent -- Response text
```

### Key Metrics
- **Lead capture rate**: % of conversations where email is collected
- **Lead submission rate**: % where full lead form is submitted
- **Resolution rate**: % of conversations marked as resolved
- **Engagement quality**: Message counts, break patterns, response times

### PII Handling
Scripts analyze PII collection (emails, phone numbers) but do not export raw PII data in reports.

## Current State

### Staged for Commit
The following files are ready to be committed:
- index.html
- leads-hub-figma-styles.css
- leads-hub-figma.html
- settings-styles.css
- settings.html

### Active Development
The project is in an active analysis phase with multiple output files generated. The dashboard UI is being refined based on Figma designs.

## Future Work
See `SHOPPER_SIGNALS_PRD.md` and `JIRA_TICKET_SHOPPER_SIGNALS.md` for planned features around identifying high-intent shoppers.

---

## Notes for Claude
- When working with transcript parsing, always test against the message format patterns in `analyze_conversations.py`
- CSV outputs are consumed by HTML dashboards - be careful about changing column names
- The project has multiple iterations of scripts (`_v2`, `final_`, etc.) - check file modification dates to find the most current version
- Dashboard styling follows Figma design system in `leads-hub-figma-styles.css`
