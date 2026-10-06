import { useEffect, useMemo, useState } from "react"

export interface SortOption<T> {
    id: string
    label: string
    compare: (a: T, b: T) => number
}

export interface FilterDefinition<T> {
    id: string
    titulo: string

    getValue: (
        item: T
    ) => string

    dependsOn?: string[]
}

export interface OpcaoFiltro {
    label: string
    value: string
}

export interface ConfigFiltro {
    id: string
    titulo: string
    opcoes: OpcaoFiltro[]
}

interface UseProductFiltersProps<T> {
    items: T[]

    searchFn: (
        item: T
    ) => string

    getPrice?: (
        item: T
    ) => number

    filterDefinitions: FilterDefinition<T>[]
    sortOptions: SortOption<T>[]
}

export function useProductFilters<T>({
    items,
    searchFn,
    getPrice,
    filterDefinitions,
    sortOptions
}: UseProductFiltersProps<T>) {

    const [pesquisa, setPesquisa] =
        useState("")

    const [ordenacao, setOrdenacao] =
        useState(
            sortOptions[0]?.id ?? ""
        )

    const [filtros, setFiltros] =
        useState<Record<string, string>>({})

    const [preco, setPreco] =
        useState<number[]>([0, 0])

    const menorPreco = useMemo(() => {

        if (
            !getPrice ||
            items.length === 0
        ) {
            return 0
        }

        return Math.min(
            ...items.map(item =>
                getPrice(item)
            )
        )

    }, [items, getPrice])

    const maiorPreco = useMemo(() => {

        if (
            !getPrice ||
            items.length === 0
        ) {
            return 0
        }

        return Math.max(
            ...items.map(item =>
                getPrice(item)
            )
        )

    }, [items, getPrice])

    useEffect(() => {

        if (
            preco[0] === 0 &&
            preco[1] === 0 &&
            maiorPreco > 0
        ) {
            setPreco([
                menorPreco,
                maiorPreco
            ])
        }

    }, [
        menorPreco,
        maiorPreco,
        preco
    ])

    function alterarFiltro(
        filtroId: string,
        valor: string
    ) {

        setFiltros(prev => ({
            ...prev,
            [filtroId]: valor
        }))
    }

    function alterarPreco(
        precoMin: number,
        precoMax: number
    ) {
        setPreco([
            Math.min(precoMin, precoMax),
            Math.max(precoMin, precoMax)
        ])
    }

    const filtrosConfig =
        useMemo<ConfigFiltro[]>(() => {

            return filterDefinitions.map(
                definition => {

                    let listaFiltrada =
                        [...items]

                    if (
                        definition.dependsOn
                    ) {

                        definition.dependsOn.forEach(
                            dependencia => {

                                const valor =
                                    filtros[
                                    dependencia
                                    ]

                                if (
                                    !valor
                                ) {
                                    return
                                }

                                const filtroPai =
                                    filterDefinitions.find(
                                        filtro =>
                                            filtro.id ===
                                            dependencia
                                    )

                                if (
                                    !filtroPai
                                ) {
                                    return
                                }

                                listaFiltrada =
                                    listaFiltrada.filter(
                                        item =>
                                            filtroPai.getValue(
                                                item
                                            ) === valor
                                    )
                            }
                        )
                    }

                    const opcoes =
                        [
                            ...new Set(
                                listaFiltrada.map(
                                    item =>
                                        definition.getValue(
                                            item
                                        )
                                )
                            )
                        ]
                            .sort()
                            .map(valor => ({
                                label: valor,
                                value: valor
                            }))

                    return {
                        id:
                            definition.id,

                        titulo:
                            definition.titulo,

                        opcoes
                    }
                }
            )

        }, [
            items,
            filtros,
            filterDefinitions
        ])

    const itensFiltrados =
        useMemo(() => {

            const sort =
                sortOptions.find(
                    option =>
                        option.id ===
                        ordenacao
                )

            return [...items]
                .filter(item => {

                    const texto =
                        searchFn(item)

                    if (
                        pesquisa &&
                        !texto
                            .toLowerCase()
                            .includes(
                                pesquisa.toLowerCase()
                            )
                    ) {
                        return false
                    }

                    for (
                        const definition of
                        filterDefinitions
                    ) {

                        const valorFiltro =
                            filtros[
                            definition.id
                            ]

                        if (
                            !valorFiltro
                        ) {
                            continue
                        }

                        if (
                            definition.getValue(
                                item
                            ) !==
                            valorFiltro
                        ) {
                            return false
                        }
                    }

                    if (getPrice) {

                        const valor =
                            getPrice(item)

                        if (
                            valor < preco[0] ||
                            valor > preco[1]
                        ) {
                            return false
                        }
                    }

                    return true
                })
                .sort(sort?.compare)

        }, [
            items,
            filtros,
            pesquisa,
            ordenacao,
            sortOptions,
            searchFn,
            filterDefinitions,
            getPrice,
            preco
        ])



    return {
        pesquisa,
        setPesquisa,
        filtros,
        alterarFiltro,
        ordenacao,
        setOrdenacao,
        itensFiltrados,
        filtrosConfig,
        preco,
        alterarPreco,
        menorPreco,
        maiorPreco
    }
}