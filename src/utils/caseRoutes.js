/** Wizard list path for add or edit case flow. */
export function getCaseWizardPath(step, caseId) {
  const base = caseId ? `/cases/edit-cases/${caseId}` : '/cases/add-cases';
  return `${base}?step=${step}`;
}
