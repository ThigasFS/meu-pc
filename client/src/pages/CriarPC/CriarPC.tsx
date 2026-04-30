import { Outlet } from "react-router-dom"
import PC from "../../interfaces/pc"
import { useState } from "react"
import { Box } from "@mui/material"

function CriarPC() {
    const [pcMontado, setPcMontado] = useState<Partial<PC>>({})

    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: "#111",
                overflowY: "auto",
                px: 2,
                py: 2
            }}
        >
            <Outlet context={{ pcMontado, setPcMontado }} />
        </Box>
    )
}

export default CriarPC