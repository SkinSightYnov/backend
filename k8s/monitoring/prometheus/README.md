# Prometheus Kubernetes setup :

## Prerequisites
If running on GKE :
you'll need to give your account cluster-admin role to be able to create cluster role binding for prometheus service account.
```bash
ACCOUNT=$(gcloud info --format='value(config.account)')
kubectl create clusterrolebinding owner-cluster-admin-binding \
    --clusterrole cluster-admin \
    --user $ACCOUNT
```

## Deploy
Create a namespace for prometheus
```bash
kubectl create namespace monitoring
```

Create the custer role and role binding for prometheus
```bash
kubectl apply -f prometheus-role.yaml
```

Create the prometheus config map
```bash
kubectl apply -f prometheus-configmap.yaml
```

Create the prometheus deployment
```bash
kubectl apply -f prometheus-deployment.yaml
```
Get the deployment name:
```bash
kubectl get deployments --namespace=monitoring
```

Expose the prometheus deployment using a service
```bash
kubectl apply -f prometheus-service.yaml
```

## Access

The prometheus can be accessed through the service on node port 30000, you can get the node port using the following command:
```bash
kubectl get svc -n monitoring
```

## Cleanup
To delete the prometheus deployment, you can use the following command:
```bash
kubectl delete -f prometheus-deployment.yaml
```

To delete the prometheus service, you can use the following command:
```bash
kubectl delete -f prometheus-service.yaml
```

To delete the prometheus config map, you can use the following command:
```bash
kubectl delete -f prometheus-configmap.yaml
```

To delete the prometheus cluster role and role binding, you can use the following command:
```bash
kubectl delete -f prometheus-role.yaml
```

To delete the monitoring namespace, you can use the following command:
```bash
kubectl delete namespace monitoring
```

## Configuration
You can configure prometheus by modifying the `prometheus-configmap.yaml` file.
