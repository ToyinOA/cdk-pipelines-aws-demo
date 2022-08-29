// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// // import * as sqs from 'aws-cdk-lib/aws-sqs';

// export class CdkpipelinesDemoStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // The code that defines your stack goes here

//     // example resource
//     // const queue = new sqs.Queue(this, 'CdkpipelinesDemoQueue', {
//     //   visibilityTimeout: cdk.Duration.seconds(300)
//     // });
//   }
// }

// import { App, Stack, StackProps } from 'aws-cdk-lib';
// import * as cdk from 'aws-cdk-lib';
// import * as s3 from "aws-cdk-lib/aws-s3";
// import * as ecs from 'aws-cdk-lib/aws-ecs';
// import * as cw from '@aws-cdk/aws-cloudwatch';
// import * as sqs from '@aws-cdk/aws-sqs';
// import * as asg from '@aws-cdk/aws-autoscaling';
// import * as ec2 from '@aws-cdk/aws-ec2';
// import * as codebuild from 'aws-cdk-lib/aws-codebuild';
// import { Duration } from '@aws-cdk/core';
// import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
// import * as s3nots from '@aws-cdk/aws-s3-notifications';
// import { Asset } from 'aws-cdk-lib/aws-s3-assets';
// import * as cfninc from 'aws-cdk-lib/cloudformation-include';
// import * as ssm from 'aws-cdk-lib/aws-ssm';
// import * as sm from "aws-cdk-lib/aws-secretsmanager";
// import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
// import { Function, InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda';
// import { Context, Handler, APIGatewayProxyCallback, APIGatewayEvent, S3Event, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
// Add the @types/aws-lambda package as a development dependency.
// import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
// import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
// const dynamodb = require('aws-sdk/clients/dynamodb');
// const docClient = new dynamodb.DocumentClient();

// import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import * as apigw from "aws-cdk-lib/aws-apigateway";
// import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as path from 'path';

import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as path from 'path';

/**
 * A stack for our simple Lambda-powered web service
 * This is the application stack
 */
export class CdkpipelinesDemoStack extends Stack {
  /**
   * The URL of the API Gateway endpoint, for use in the integ tests
   */
  public readonly urlOutput: CfnOutput;
 
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The Lambda function that contains the functionality
    const handler = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
    });

    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.LambdaRestApi(this, 'Gateway', {
      description: 'Endpoint for a simple Lambda-powered web service',
      handler,
    });

    this.urlOutput = new CfnOutput(this, 'Url', {
      value: gw.url,
    });
  }
}