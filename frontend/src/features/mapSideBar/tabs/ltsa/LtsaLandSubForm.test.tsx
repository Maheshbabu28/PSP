import { Formik } from 'formik';
import { LtsaOrders } from 'interfaces/ltsaModels';
import { noop } from 'lodash';
import { render, RenderOptions } from 'utils/test-utils';

import LtsaLandSubForm, { ILtsaLandSubFormProps } from './LtsaLandSubForm';
import { mockLtsaResponse } from './LtsaTabView.test';

describe('LtsaLandSubForm component', () => {
  const setup = (
    renderOptions: RenderOptions & ILtsaLandSubFormProps & { ltsaData?: LtsaOrders } = {},
  ) => {
    // render component under test
    const component = render(
      <Formik onSubmit={noop} initialValues={renderOptions.ltsaData ?? {}}>
        <LtsaLandSubForm
          nameSpace={renderOptions.nameSpace ?? 'titleOrders.0.orderedProduct.fieldedData'}
        />
      </Formik>,
      {
        ...renderOptions,
      },
    );

    return {
      component,
    };
  };
  it('renders charge sub form', () => {
    const { component } = setup({
      ltsaData: mockLtsaResponse as any,
    });
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('charge sub form does not render anything if charge array is empty', () => {
    const testData = { ...mockLtsaResponse };
    testData.titleOrders[0].orderedProduct.fieldedData.descriptionsOfLand = [];
    const {
      component: { getByText },
    } = setup({
      ltsaData: mockLtsaResponse as any,
    });
    expect(getByText('this title has no land')).toBeVisible();
  });
});
