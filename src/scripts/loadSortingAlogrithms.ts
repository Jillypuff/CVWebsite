import { SortFunction } from "../types/sortingTypes";

const modules = import.meta.glob<{ default: SortFunction }>("./sortingAlgorithms/*.ts");

async function loadSortingAlgorithms(): Promise<Record<string, SortFunction>> {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const name = path
        .split("/")
        .pop()
        ?.replace("Sort.ts", "")
        .toLowerCase();

      const mod = await loader();
      return [name, mod.default] as const;
    })
  );

  return Object.fromEntries(entries);
}

export default loadSortingAlgorithms;