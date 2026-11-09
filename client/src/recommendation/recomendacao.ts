
type Purpose = "jogos" | "profissional" | "estudos" | "casual";
type Profile = "custo-beneficio" | "hibrido" | "desempenho";

type CPU = {
  id: string;
  name: string;
  price: number;
  cores: number;
  threads: number;
  maxClockGHz: number;
  cpuMark?: number;
  singleThread?: number;
  socket?: string;
  supportedMemoryTypes?: string[];
  integratedGraphics?: boolean;
};

type GPU = {
  id: string;
  name: string;
  price: number;
  vramGB: number;
  baseClockMHz?: number;
  boostClockMHz?: number;
  gameFps?: number;
  onePercentLow?: number;
  blenderScore?: number;
};

type RAM = {
  id: string;
  name: string;
  price: number;
  capacityGB: number;
  frequencyMHz: number;
  latencyNs: number;
  memoryType?: string;
};

type Storage = {
  id: string;
  name: string;
  price: number;
  capacityGB: number;
  technology: "hdd-sata" | "ssd-sata" | "ssd-nvme";
};

export type Dataset = {
  cpus: CPU[];
  gpus: GPU[];
  rams: RAM[];
  storages: Storage[];
};

type ComponentScore = {
  performance: number;
  adequacy: number;
  costBenefit: number;
  final: number;
};

type Scored<T> = {
  product: T;
  score: ComponentScore;
};

type Configuration = {
  cpu: CPU;
  gpu: GPU | null;
  ram: RAM;
  storage: Storage;
  price: number;
  score: number;
  compatibility: "verificada parcialmente";
};

const PROFILE_WEIGHTS: Record<Profile, [number, number, number]> = {
  "custo-beneficio": [0.25, 0.35, 0.40],
  hibrido: [0.40, 0.40, 0.20],
  desempenho: [0.60, 0.30, 0.10],
};

const PURPOSE_WEIGHTS: Record<Purpose, {
  cpu: number;
  gpu: number;
  ram: number;
  storage: number;
}> = {
  jogos: {
    cpu: 0.25, gpu: 0.45, ram: 0.20, storage: 0.10,
  },
  profissional: {
    cpu: 0.40, gpu: 0.25, ram: 0.20, storage: 0.15,
  },
  estudos: {
    cpu: 0.35, gpu: 0.10, ram: 0.30, storage: 0.25,
  },
  casual: {
    cpu: 0.35, gpu: 0.05, ram: 0.30, storage: 0.30,
  },
};

const CPU_IDEAL: Record<Purpose, number> = {
  jogos: 90,
  profissional: 85,
  estudos: 65,
  casual: 40,
};

const GPU_IDEAL: Record<Purpose, number> = {
  jogos: 90,
  profissional: 85,
  estudos: 40,
  casual: 30,
};

const RAM_IDEAL: Record<Purpose, number> = {
  jogos: 32,
  profissional: 32,
  estudos: 16,
  casual: 8,
};

const STORAGE_IDEAL: Record<Purpose, number> = {
  jogos: 2000,
  profissional: 2000,
  estudos: 512,
  casual: 256,
};

// ------------------------------
// Funções auxiliares
// ------------------------------

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function normalizeMax(value: number | undefined, max: number): number | undefined {
  if (value === undefined || value <= 0 || max <= 0) return undefined;
  return clamp((value / max) * 100);
}

function normalizeMinMax(
  value: number | undefined,
  values: number[],
): number | undefined {
  if (value === undefined || values.length === 0) return undefined;

  const min = Math.min(...values);
  const max = Math.max(...values);

  if (max === min) return 100;

  return clamp(((value - min) / (max - min)) * 100);
}

function weightedAvailable(
  metrics: Array<[number | undefined, number]>,
): number | undefined {
  const available = metrics.filter(
    (item): item is [number, number] => item[0] !== undefined,
  );

  if (available.length === 0) return undefined;

  const totalWeight = available.reduce((sum, item) => sum + item[1], 0);

  return available.reduce(
    (sum, [value, weight]) => sum + value * (weight / totalWeight),
    0,
  );
}

function adequacy(score: number, ideal: number): number {
  return clamp((score / ideal) * 100);
}

function normalizeCostBenefit(value: number, max: number): number {
  return normalizeMax(value, max) ?? 0;
}

function combineProfile(
  performance: number,
  adequacyScore: number,
  costBenefit: number,
  profile: Profile,
): number {
  const [p, a, cb] = PROFILE_WEIGHTS[profile];

  return (
    performance * p +
    adequacyScore * a +
    costBenefit * cb
  );
}

// ------------------------------
// CPU
// ------------------------------

function scoreCPU(
  cpu: CPU,
  all: CPU[],
  purpose: Purpose,
) {
  const cpuMarks = all.map(c => c.cpuMark).filter((v): v is number => v !== undefined);
  const singleThreads = all.map(c => c.singleThread).filter((v): v is number => v !== undefined);

  const cm = normalizeMax(cpu.cpuMark, Math.max(...cpuMarks, 1));
  const st = normalizeMax(cpu.singleThread, Math.max(...singleThreads, 1));

  // Estimativa técnica quando não há benchmark disponível.
  const cores = normalizeMinMax(cpu.cores, all.map(c => c.cores));
  const threads = normalizeMinMax(cpu.threads, all.map(c => c.threads));
  const clock = normalizeMinMax(cpu.maxClockGHz, all.map(c => c.maxClockGHz));

  const estimated = weightedAvailable([
    [cores, 0.40],
    [threads, 0.30],
    [clock, 0.30],
  ]) ?? 0;

  const benchmarkScore = weightedAvailable([
    [cm, 0.70],
    [st, 0.30],
  ]);

  const performance = benchmarkScore ?? estimated;

  const purposeWeights: Record<Purpose, [number, number]> = {
    jogos: [0.30, 0.70],
    profissional: [0.70, 0.30],
    estudos: [0.50, 0.50],
    casual: [0.30, 0.70],
  };

  const [cmWeight, stWeight] = purposeWeights[purpose];

  const usageScore = weightedAvailable([
    [cm, cmWeight],
    [st, stWeight],
  ]) ?? estimated;

  return {
    performance,
    adequacy: adequacy(usageScore, CPU_IDEAL[purpose]),
    costRaw: usageScore / Math.max(cpu.price, 1),
  };
}

// ------------------------------
// GPU
// ------------------------------

function scoreGPU(
  gpu: GPU,
  all: GPU[],
  purpose: Purpose,
) {
  const maxFps = Math.max(...all.map(g => g.gameFps ?? 0), 1);
  const maxLow = Math.max(...all.map(g => g.onePercentLow ?? 0), 1);
  const maxBlender = Math.max(...all.map(g => g.blenderScore ?? 0), 1);

  const fps = normalizeMax(gpu.gameFps, maxFps);
  const low = normalizeMax(gpu.onePercentLow, maxLow);

  const gameScore = weightedAvailable([
    [fps, 0.70],
    [low, 0.30],
  ]);

  const professionalScore = normalizeMax(
    gpu.blenderScore,
    maxBlender,
  );

  const vram = normalizeMax(
    gpu.vramGB,
    Math.max(...all.map(g => g.vramGB), 1),
  );

  const baseClock = normalizeMax(
    gpu.baseClockMHz,
    Math.max(...all.map(g => g.baseClockMHz ?? 0), 1),
  );

  const boostClock = normalizeMax(
    gpu.boostClockMHz,
    Math.max(...all.map(g => g.boostClockMHz ?? 0), 1),
  );

  const generalScore = weightedAvailable([
    [vram, 0.40],
    [boostClock, 0.35],
    [baseClock, 0.25],
  ]) ?? 0;

  let performance: number;

  if (purpose === "jogos") {
    performance = gameScore ?? generalScore;
  } else if (purpose === "profissional") {
    performance = professionalScore ?? generalScore;
  } else {
    performance = generalScore;
  }

  return {
    performance,
    adequacy: adequacy(performance, GPU_IDEAL[purpose]),
    costRaw: performance / Math.max(gpu.price, 1),
  };
}

// ------------------------------
// Memória RAM
// ------------------------------

function scoreRAM(ram: RAM, purpose: Purpose) {
  const frequency = clamp(
    ((ram.frequencyMHz - 1600) / (6400 - 1600)) * 100,
  );

  const latency = clamp(
    ((25 - ram.latencyNs) / (25 - 8)) * 100,
  );

  const performance = frequency * 0.50 + latency * 0.50;

  const capacityAdequacy = adequacy(
    ram.capacityGB,
    RAM_IDEAL[purpose],
  );

  return {
    performance,
    adequacy: capacityAdequacy,
    costRaw:
      (performance * ram.capacityGB) / Math.max(ram.price, 1),
  };
}

// ------------------------------
// Armazenamento
// ------------------------------

function scoreStorage(storage: Storage, purpose: Purpose) {
  const technologyScores = {
    "hdd-sata": 25,
    "ssd-sata": 60,
    "ssd-nvme": 100,
  };

  const performance = technologyScores[storage.technology];

  const capacityAdequacy = adequacy(
    storage.capacityGB,
    STORAGE_IDEAL[purpose],
  );

  return {
    performance,
    adequacy: capacityAdequacy,
    costRaw:
      (performance * storage.capacityGB) /
      Math.max(storage.price, 1),
  };
}

// ------------------------------
// Pontuação dos componentes
// ------------------------------

function scoreProducts<T>(
  products: T[],
  calculate: (product: T) => {
    performance: number;
    adequacy: number;
    costRaw: number;
  },
  profile: Profile,
): Scored<T>[] {
  const calculated = products.map(product => ({
    product,
    values: calculate(product),
  }));

  const maxCost = Math.max(
    ...calculated.map(item => item.values.costRaw),
    1,
  );

  return calculated.map(({ product, values }) => {
    const costBenefit = normalizeCostBenefit(
      values.costRaw,
      maxCost,
    );

    return {
      product,
      score: {
        performance: values.performance,
        adequacy: values.adequacy,
        costBenefit,
        final: combineProfile(
          values.performance,
          values.adequacy,
          costBenefit,
          profile,
        ),
      },
    };
  });
}

// ------------------------------
// Montagem e recomendação
// ------------------------------

export function recommendComputers(
  dataset: Dataset,
  purpose: Purpose,
  profile: Profile,
  limit = 2,
): Configuration[] {
  const cpus = scoreProducts(
    dataset.cpus,
    cpu => scoreCPU(cpu, dataset.cpus, purpose),
    profile,
  );

  const gpus = scoreProducts(
    dataset.gpus,
    gpu => scoreGPU(gpu, dataset.gpus, purpose),
    profile,
  );

  const rams = scoreProducts(
    dataset.rams,
    ram => scoreRAM(ram, purpose),
    profile,
  );

  const storages = scoreProducts(
    dataset.storages,
    storage => scoreStorage(storage, purpose),
    profile,
  );

  // Reduz o número de combinações avaliadas.
  const top = <T,>(items: Scored<T>[], amount = 8) =>
    [...items]
      .sort((a, b) => b.score.final - a.score.final)
      .slice(0, amount);

  const bestCPUs = top(cpus);
  const bestGPUs = top(gpus);
  const bestRAMs = top(rams);
  const bestStorages = top(storages);

  const configurations: Configuration[] = [];

  for (const cpu of bestCPUs) {
    for (const ram of bestRAMs) {
      // Verifica incompatibilidade de memória quando os dados existem.
      const supported = cpu.product.supportedMemoryTypes;
      const memoryType = ram.product.memoryType;

      if (
        supported &&
        memoryType &&
        !supported.includes(memoryType)
      ) {
        continue;
      }

      const gpuOptions: Array<Scored<GPU> | null> = [
        ...bestGPUs,
      ];

      // Permite configuração sem GPU dedicada apenas quando
      // há vídeo integrado informado e a finalidade permite.
      if (
        cpu.product.integratedGraphics &&
        (purpose === "estudos" || purpose === "casual")
      ) {
        gpuOptions.push(null);
      }

      for (const gpu of gpuOptions) {
        for (const storage of bestStorages) {
          const weights = PURPOSE_WEIGHTS[purpose];

          let totalWeight = weights.cpu + weights.ram + weights.storage;
          let totalScore =
            cpu.score.final * weights.cpu +
            ram.score.final * weights.ram +
            storage.score.final * weights.storage;

          if (gpu) {
            totalWeight += weights.gpu;
            totalScore += gpu.score.final * weights.gpu;
          }

          configurations.push({
            cpu: cpu.product,
            gpu: gpu?.product ?? null,
            ram: ram.product,
            storage: storage.product,
            price:
              cpu.product.price +
              (gpu?.product.price ?? 0) +
              ram.product.price +
              storage.product.price,
            score: totalScore / totalWeight,
            compatibility: "verificada parcialmente",
          });
        }
      }
    }
  }

  return configurations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
