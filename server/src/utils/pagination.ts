export function getPagination(pageInput: number | undefined, limit = 10) {
  const page = Number.isInteger(pageInput) && pageInput && pageInput > 0 ? pageInput : 1;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
