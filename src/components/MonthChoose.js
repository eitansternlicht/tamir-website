import React from 'react';
import { Grid, Button, ButtonGroup } from '@material-ui/core/';

const MonthChoose = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid item>
            <ButtonGroup size="Large" aria-label="Large outlined button group">
              <Button>ינו</Button>
              <Button>פבר</Button>
              <Button>מרץ</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup size="Large" aria-label="Large outlined button group">
              <Button>אפר</Button>
              <Button>מאי</Button>
              <Button>יונ</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup size="Large" aria-label="Large outlined button group">
              <Button>יול</Button>
              <Button>אוג</Button>
              <Button>ספט</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup size="Large" aria-label="Large outlined button group">
              <Button>אוק</Button>
              <Button>נוב</Button>
              <Button>דצמ</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { MonthChoose };
