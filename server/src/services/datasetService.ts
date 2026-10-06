const DATASET = "Doshiba%2Fpcpartpicker-parts-dataset";
const BASE_URL = "https://datasets-server.huggingface.co";

const CATEGORIES = [
    "cpu",
    "cpu-cooler",
    "motherboard",
    "memory",
    "internal-hard-drive",
    "video-card",
    "power-supply",
    "case",
];

interface DatasetRow {
    row: {
        category: string;
        name: string;
        brand: string;
        url: string;
        image_url: string;
        price_eur: number | null;
        rating_count: number;
        specs: Record<string, string>;
    };
}

interface DatasetResponse {
    rows: DatasetRow[];
    num_rows_total: number;
}

async function getRows(offset = 0, length = 100): Promise<DatasetResponse> {
    const url =
        `${BASE_URL}/rows` +
        `?dataset=${DATASET}` +
        `&config=default` +
        `&split=train` +
        `&offset=${offset}` +
        `&length=${length}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Erro ao consultar Hugging Face: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
}

export async function getDatasetSpecs() {
    const specs: Record<
        string,
        {
            count: number;
            fields: Record<string, Set<string>>;
        }
    > = {};

    let offset = 0;
    let totalRows = 0;

    while (true) {
        const data = await getRows(offset, 100);

        totalRows = data.num_rows_total;

        for (const item of data.rows) {
            const row = item.row;

            if (!specs[row.category]) {
                specs[row.category] = {
                    count: 0,
                    fields: {},
                };
            }

            specs[row.category].count++;

            for (const [key, value] of Object.entries(row.specs ?? {})) {
                if (!specs[row.category].fields[key]) {
                    specs[row.category].fields[key] = new Set();
                }

                if (value !== null && value !== undefined && value !== "") {
                    specs[row.category].fields[key].add(value);
                }
            }
        }

        offset += data.rows.length;

        if (offset >= totalRows || data.rows.length === 0) {
            break;
        }

        console.log(`Dataset analisado: ${offset}/${totalRows}`);
    }

    return {
        totalRows,
        categories: Object.fromEntries(
            Object.entries(specs).map(([category, data]) => [
                category,
                {
                    count: data.count,
                    specs: Object.fromEntries(
                        Object.entries(data.fields).map(([field, values]) => [
                            field,
                            {
                                uniqueValues: values.size,
                                values: Array.from(values).sort(),
                            },
                        ])
                    ),
                },
            ])
        ),
    };
}