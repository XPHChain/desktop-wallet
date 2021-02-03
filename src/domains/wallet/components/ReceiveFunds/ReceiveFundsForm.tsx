import { Alert } from "app/components/Alert";
import { FormField, FormLabel } from "app/components/Form";
import { InputCounter, InputCurrency } from "app/components/Input";
import { useValidation } from "app/hooks";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const ReceiveFundsForm = () => {
	const { t } = useTranslation();

	const form = useFormContext();
	const { getValues, setValue, register } = form;
	const { receiveFunds } = useValidation();
	const { smartbridge } = form.watch();
	const maxLength = receiveFunds.smartbridge().maxLength?.value;

	useEffect(() => {
		register("amount");
	}, [register]);

	return (
		<div data-testid="ReceiveFundsForm">
			<div className="mt-8 space-y-8">
				<FormField name="amount">
					<FormLabel label={t("COMMON.AMOUNT")} required={false} />
					<InputCurrency
						data-testid="ReceiveFundsForm__amount"
						placeholder={t("COMMON.AMOUNT")}
						className="pr-20"
						value={getValues("amount")}
						onChange={(currency) => setValue("amount", currency.display)}
					/>
				</FormField>

				<FormField name="smartbridge">
					<FormLabel label={t("COMMON.SMARTBRIDGE")} required={false} optional={true} />
					<InputCounter
						ref={register(receiveFunds.smartbridge())}
						data-testid="ReceiveFundsForm__smartbridge"
						type="text"
						placeholder=" "
						className="pr-24"
						defaultValue={smartbridge}
						maxLengthLabel={maxLength.toString()}
					/>
				</FormField>

				{smartbridge?.length > maxLength && (
					<div className="mt-8" data-testid="ReceiveFundsForm__smartbridge-warning">
						<Alert variant="warning">{t("WALLETS.MODAL_RECEIVE_FUNDS.WARNING", { maxLength })}</Alert>
					</div>
				)}
			</div>
		</div>
	);
};
