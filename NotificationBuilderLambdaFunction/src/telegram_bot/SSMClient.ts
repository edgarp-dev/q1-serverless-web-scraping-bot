import * as AWS from 'aws-sdk';

export default class SSMClient {
    private _ssmClient: AWS.SSM;
    constructor() {
        AWS.config.update({
            region: process.env.AWS_REGION
        });
        this._ssmClient = new AWS.SSM();
    }

    public async getParameter(parameterName: string): Promise<string> {
        const params = {
            Name: parameterName,
        };
        const parameterResponse: AWS.SSM.GetParameterResult = await this._ssmClient.getParameter(params).promise();
        const value = this.getValueFromParameterResponse(parameterResponse);
        return value;
    }

    private getValueFromParameterResponse(parameterResponse: AWS.SSM.GetParameterResult): string {
        return parameterResponse.Parameter.Value;
    }
}