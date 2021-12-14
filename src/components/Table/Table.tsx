import {
  Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {Point} from '../Plot/Plot'

interface CustomTableProps {
  rows: Point[]
}

function tickFormat(d:number):string { return `${new Date(d).toLocaleDateString('zh-CN')} ${new Date(d).toLocaleTimeString('en-GB')}`  }

export const CustomTable = ({ rows }: CustomTableProps) => {
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
            key={row.x}
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