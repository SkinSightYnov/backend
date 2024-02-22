# Prometheus State Metrics Kubernetes setup :

## Prerequisites
Need to have the prometheus running on the monitoring namespace, created when deploying the Prometheus stack.

if running on GKE , need to give your account cluster-admin role to be able to create cluster role binding for prometheus service account. (see [Prometheus Kubernetes setup](../prometheus/README.md))

## Deploy
Create everything in the directory
```bash
kubectl apply -f .
```

## Access
All the Kube static metrics can be obtained from the Kube state service endpoint on /metrics URI.


## Cleanup
To delete the prometheus state metrics deployment, you can use the following command:
```bash
kubectl delete -f .
```

