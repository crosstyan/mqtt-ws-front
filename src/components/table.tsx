import {
  Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {Point} from './plot'

interface CustomTableProps {
  rows: Point[]
}

function tickFormat(d:number):string { return `${new Date(d).toLocaleDateString('zh-CN')} ${new Date(d).toLocaleTimeString('en-GB')}`  }

function getUniquePtsAry(ary: Point[]){
  const uniqueSet = new Set<Point>()
  ary.forEach(pt => {uniqueSet.add(pt)})
  const uniqueAry = Array.from(uniqueSet)
  return uniqueAry
}

export function CustomTable ({ rows }: CustomTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.x.toString()}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
          >
            <TableCell component="th" scope="row">
              {tickFormat(row.x)}
            </TableCell>
            <TableCell align="right">{row.y}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}