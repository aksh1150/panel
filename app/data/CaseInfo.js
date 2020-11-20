const RequestedHelp = [
  {
    label: 'Medical cost',
    click: false,
  },
  {
    label: 'Health insurance',
    click: false,
  },
  {
    label: 'Care coordination',
    click: false,
  },
  {
    label: 'End of life planning',
    click: false,
  },
  {
    label: 'Employment and disability',
    click: false,
  },
  {
    label: 'A doctor or hospital',
    click: false,
  },
  {
    label: 'Finding care',
    click: false,
  },
  {
    label: 'Exploring treatment options',
    click: false,
  },
];

const Options = [
  { value: 'Open', label: 'Open' },
  { value: 'Close', label: 'Close' },
  { value: 'On Hold', label: 'On Hold' },
];

const LeadOptions = [
  { value: 'Not Contacted', label: 'Not Contacted' },
  { value: 'Undecided', label: 'Undecided' },
  { value: 'Attempted to Contact', label: 'Attempted to Contact' },
  { value: 'Intake Call', label: 'Intake Call' },
  { value: 'Connected to Advisor', label: 'Connected to Advisor' },
  { value: 'Contract Sent', label: 'Contract Sent' },
  { value: 'Lost', label: 'Lost' },
];

const ReferralBy = [
  { value: 'Website', label: 'Website' },
  { value: 'Word of Mouth', label: 'Word of Mouth' },
  { value: 'Financial Firm', label: 'Financial Firm' },
  { value: 'Existing Client', label: 'Existing Client' },
];

export { RequestedHelp, Options, ReferralBy, LeadOptions };
