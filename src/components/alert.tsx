import { SxProps } from '@mui/system';
import { Alert, Theme } from '@mui/material';
import React, { useEffect, useState } from "react";
interface CustomAlertProps {
  isErr: boolean
  sx: SxProps<Theme>
  text: string
}
export const CustomAlert = ({ isErr, sx, text }: CustomAlertProps) => {
  if (isErr) {
    return (
      <Alert severity="error" sx={sx}>
        {text}
      </Alert>
    )
  } else {
    return null
  }
}