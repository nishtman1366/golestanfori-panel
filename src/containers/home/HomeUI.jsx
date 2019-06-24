import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";

const dataDonut = {
  labels: ["کل", "موفق", "ناموفق"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const dataBar = {
  labels: [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه"
  ],
  datasets: [
    {
      label: "سفارشات",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    width: "100%"
  },
  paper: {
    height: "100%",
    color: theme.palette.text.secondary,
    position: "relative",
    top: "-42px",
    padding: "8px",
    fontFamily: "iransans"
  },
  header: {
    fontSize: "1rem",
    color: "#fff",
    textAlign: "center"
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: "iransans"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class HomeUI extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 5
    };
  }
  render() {
    return <div style={{ marginTop: "64px" }}> {this.renderUI()}</div>;
  }

  renderUI = () => {
    return (
      <div style={{ marginTop: 64 }}>HOME</div>
      // <Grid container spacing={8} justify="center">
      //   <Grid item xs={11} md={6}>
      //     {this.renderUserTable()}
      //   </Grid>
      //   <Grid item xs={11} md={5}>
      //     {this.renderOrdersChart()}
      //   </Grid>
      //   <Grid item xs={11} style={{ marginTop: "32px" }}>
      //     {this.renderMessages()}
      //   </Grid>
      // </Grid>
    );
  };

  renderUserTable = () => {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        this.props.users ? this.props.users.length - page * rowsPerPage : void 0
      );
    var rowNumber = 1;
    return (
      // <Grid item xs={12} sm={4} style={{ marginTop: "64px" }}>

      <Paper className={classes.paper} style={{ background: "#1e7373" }}>
        <h1 style={{ color: "#fff", textAlign: "center" }}>لیست کاربران</h1>
        <Paper className={classes.root} style={{ marginTop: "-1px" }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "right" }}>ردیف</TableCell>
                <TableCell style={{ textAlign: "right", padding: "0" }}>
                  نام
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  نام خانوادگی
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>نوع</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users
                ? this.props.users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      return (
                        <TableRow
                          key={n.userId}
                          className={classes.row}
                          hover
                          // onClick={event =>
                          //   this.props.OnClickRow(event, n.id)
                          // }
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ textAlign: "right" }}
                          >
                            {rowNumber++}
                          </TableCell>
                          <TableCell
                            numeric
                            style={{
                              textAlign: "right",
                              padding: "0"
                            }}
                          >
                            {n.firstName}
                          </TableCell>
                          <TableCell style={{ textAlign: "right" }}>
                            {n.lastName}
                          </TableCell>

                          <TableCell numeric style={{ textAlign: "right" }}>
                            {n.group}
                          </TableCell>
                        </TableRow>
                      );
                    })
                : void 0}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow />
            </TableFooter>
          </Table>
        </Paper>

        <div style={{ textAlign: "left", color: "#fff" }}>
          <Button
            href="/managementUsers"
            style={{
              color: "#fff",
              fontSize: "1rem"
            }}
          >
            مشاهده...
          </Button>
        </div>
      </Paper>
    );
  };

  renderOrdersChart = () => {
    const { classes } = this.props;

    return (
      // <Grid item xs={12} sm={4} style={{ marginTop: "64px" }}>

      <Paper className={classes.paper} style={{ background: "#fff" }}>
        <h1 style={{ color: "#000", textAlign: "center" }}>گزارش سفارشات</h1>

        <Doughnut
          data={this.createDataDonutChart(
            this.props.ordersChart ? this.props.ordersChart.data : void 0,
            this.props.ordersChart ? this.props.ordersChart.labels : void 0
          )}
          // options={{
          //   maintainAspectRatio: false
          // }}
        />
      </Paper>
    );
  };

  createDataDonutChart(data, labels) {
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#fb8c00",
            "#43a047",
            "#e53935"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#fb8c00",
            "#43a047",
            "#e53935"
          ]
        }
      ]
    };
  }

  renderMessages = () => {
    const { classes } = this.props;

    return (
      // <Grid item xs={12} sm={4} style={{ marginTop: "64px" }}>
      <Paper className={classes.paper} style={{ background: "#1e7373" }}>
        <h1 style={{ color: "#fff", textAlign: "center" }}>لیست پیام ها</h1>

        {this.props.messages
          ? this.props.messages.map(n => {
              return (
                <Grid
                  key={n.id}
                  item
                  xs={12}
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: "8px" }}
                >
                  <Paper
                    // className={classes.paper}
                    style={{
                      background: "#fffff",
                      padding: "8px"
                    }}
                  >
                    <div>
                      <Typography
                        variant="headline"
                        component="h2"
                        style={{
                          fontFamily: "iransans"
                        }}
                      >
                        فرستنده : {n.user}
                      </Typography>
                      <Grid item xs zeroMinWidth>
                        <Typography
                          noWrap
                          style={{
                            fontFamily: "iransans"
                          }}
                        >
                          {n.body}
                        </Typography>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
              );
            })
          : void 0}
        <div style={{ textAlign: "left", color: "#fff" }}>
          <Button
            href="/messages/inbox"
            style={{
              color: "#fff",
              fontSize: "1rem"
            }}
          >
            مشاهده...
          </Button>
        </div>
      </Paper>
    );
  };
  // renderUI = () => {
  //   console.log("res", this.props.users);

  //   const { classes } = this.props;
  //   const { rowsPerPage, page } = this.state;
  //   const emptyRows =
  //     rowsPerPage -
  //     Math.min(
  //       rowsPerPage,
  //       this.props.users ? this.props.users.length - page * rowsPerPage : void 0
  //     );
  //   var rowNumber = 1;

  //   return (
  //     <div className={classes.root}>
  //       <Grid container spacing={16}>
  //         <Grid item xs={12} sm={4} style={{ marginTop: "64px" }}>
  // <Paper className={classes.paper} style={{ background: "#1e7373" }}>
  //   {this.props.messages
  //     ? this.props.messages.map(n => {
  //         return (
  //           <Grid
  //             item
  //             xs={12}
  //             justify="center"
  //             alignItems="center"
  //             style={{ marginTop: "8px" }}
  //           >
  //             <Paper
  //               // className={classes.paper}
  //               style={{
  //                 background: "#fffff",
  //                 padding: "8px"
  //               }}
  //             >
  //               <div>
  //                 <Typography
  //                   variant="headline"
  //                   component="h2"
  //                   style={{
  //                     fontFamily: "iransans"
  //                   }}
  //                 >
  //                   فرستنده : {n.user}
  //                 </Typography>
  //                 <Grid item xs zeroMinWidth>
  //                   <Typography
  //                     noWrap
  //                     style={{
  //                       fontFamily: "iransans"
  //                     }}
  //                   >
  //                     {n.body}
  //                   </Typography>
  //                 </Grid>
  //               </div>
  //             </Paper>
  //           </Grid>
  //         );
  //       })
  //     : void 0}
  //   <div style={{ textAlign: "left", color: "#fff" }}>
  //     <Button
  //       href="/messages/inbox"
  //       style={{
  //         color: "#fff",
  //         fontSize: "1rem"
  //       }}
  //     >
  //       مشاهده...
  //     </Button>
  //   </div>
  // </Paper>
  //         </Grid>
  //         <Grid item xs={12} sm={4} style={{ marginTop: "64px" }}>
  //           {this.renderUserTable()}
  //         </Grid>

  //         <Grid item xs={12} sm={4} style={{ marginTop: "64px" }}>
  //           <Paper className={classes.paper}>
  //             <Grid item xs={12} justify="center" alignItems="center">
  //               <Paper
  //                 className={classes.paper}
  //                 style={{
  //                   background: "linear-gradient(60deg, #ab47bc, #8e24aa)"
  //                 }}
  //               >
  //                 <h1 className={classes.header}> آخرین پیام دریافت شده</h1>
  //               </Paper>
  //             </Grid>

  //             <div>
  //               <Typography
  //                 variant="headline"
  //                 component="p"
  //                 style={{
  //                   position: "absolute",
  //                   margin: "0 auto",
  //                   top: "64px",
  //                   right: 0,
  //                   left: 0,
  //                   fontSize: "1rem",
  //                   color: "#ccccc",
  //                   textAlign: "right",
  //                   padding: "8px"
  //                 }}
  //               >
  //                 اعتبار عضویت شما تا تاریخ 98/5/1 می باشد، لطفا برای تمدید
  //                 عضویت خود از طریق لینک زیر اقدام نمایید، در غیر اینصورت سیستم
  //                 به صورت خودکار دسترسی شما را به سیستم مسدود می کند.
  //               </Typography>
  //             </div>
  //           </Paper>
  //         </Grid>
  //         <Grid item xs={12} sm={8} style={{ marginTop: "64px" }}>
  //           <Paper className={classes.paper}>
  //             <Grid item xs={12} justify="center" alignItems="center">
  //               <Paper
  //                 className={classes.paper}
  //                 style={{
  //                   background: "linear-gradient(60deg, #26c6da, #00acc1)"
  //                 }}
  //               >
  //                 <h1 className={classes.header}>سفارشات فعال</h1>
  //               </Paper>
  //             </Grid>

  //             <div>
  //               <Table className={classes.table}>
  //                 <TableHead>
  //                   <TableRow>
  //                     <TableCell>Dessert (100g serving)</TableCell>
  //                     <TableCell numeric>Calories</TableCell>
  //                     <TableCell numeric>Fat (g)</TableCell>
  //                     <TableCell numeric>Carbs (g)</TableCell>
  //                     <TableCell numeric>Protein (g)</TableCell>
  //                   </TableRow>
  //                 </TableHead>
  //                 <TableBody>
  //                   {data.map(n => {
  //                     return (
  //                       <TableRow key={n.id}>
  //                         <TableCell>{n.name}</TableCell>
  //                         <TableCell numeric>{n.calories}</TableCell>
  //                         <TableCell numeric>{n.fat}</TableCell>
  //                         <TableCell numeric>{n.carbs}</TableCell>
  //                         <TableCell numeric>{n.protein}</TableCell>
  //                       </TableRow>
  //                     );
  //                   })}
  //                 </TableBody>
  //               </Table>
  //             </div>
  //             <TablePagination
  //               component="div"
  //               count={data.length}
  //               rowsPerPage=""
  //               page=""
  //               backIconButtonProps={{
  //                 "aria-label": "Previous Page"
  //               }}
  //               nextIconButtonProps={{
  //                 "aria-label": "Next Page"
  //               }}
  //               onChangePage={this.handleChangePage}
  //               onChangeRowsPerPage={this.handleChangeRowsPerPage}
  //             />
  //           </Paper>
  //         </Grid>
  //         <Grid item xs={12} sm={4} style={{ marginTop: "64px" }}>
  //           <Paper className={classes.paper}>
  //             <Grid item xs={12} justify="center" alignItems="center">
  //               <Paper
  //                 className={classes.paper}
  //                 style={{
  //                   background: "linear-gradient(60deg, #ef5350, #e53935)"
  //                 }}
  //               >
  //                 <h1 className={classes.header}>سفارشات در انتظار تحویل</h1>
  //               </Paper>
  //             </Grid>

  //             <div>
  //               <h1 className={classes.header}>text</h1>
  //               <h1 className={classes.header}>text</h1>
  //               <h1 className={classes.header}>text</h1>
  //               <h1 className={classes.header}>text</h1>
  //               <h1 className={classes.header}>text</h1>
  //             </div>
  //           </Paper>
  //         </Grid>
  //       </Grid>
  //     </div>
  //   );
  // };
}

export default withStyles(styles, { withTheme: true })(HomeUI);
